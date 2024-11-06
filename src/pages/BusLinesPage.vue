<template>
    <div class="bus-lines-page">
        <BaseCard class="bus-line-select-card" title="Select Bus Line">
            <ul class="bus-lines-list">
                <li v-for="line in lines" :key="line" @click="selectLine(line)">
                    <BaseButton
                        type="button"
                        class="line-button"
                        :is-active="selectedLine === line"
                    >
                        {{ line }}
                    </BaseButton>
                </li>
            </ul>
        </BaseCard>

        <Transition name="fade" mode="out-in">
            <BaseCardEmpty v-if="!selectedLine" message="Please select the bus line first" />
            <CardList
                v-else
                :key="selectedLine"
                :title="`Bus Line: ${selectedLine}`"
                :subtitle="'Bus Stops'"
                :items="selectedLineStops"
                :reversible="true"
                :selectable="true"
                :model-value="selectedLineStop"
                @update:model-value="selectLineStop($event)"
            />
        </Transition>

        <Transition name="fade" mode="out-in">
            <BaseCardEmpty
                v-if="!selectedLine || !selectedLineStop"
                :message="
                    !selectedLine
                        ? 'Please select the bus line first'
                        : 'Please select the bus stop first'
                "
            />
            <CardList
                v-else
                :key="selectedLineStop"
                :title="`Bus Stop: ${selectedLineStop}`"
                :subtitle="'Time'"
                :items="selectedLineStopTimes"
            />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { StoreAction } from '@/store/config';
import { useStore } from '@/store';

import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseCardEmpty from '@/components/BaseCardEmpty/BaseCardEmpty.vue';
import CardList from '@/components/CardList/CardList.vue';

const router = useRouter();
const store = useStore();

const lines = computed<number[]>(() => store.getters.lines);
const selectedLine = ref<null | number>(null);

const selectedLineStops = ref<string[]>([]);
const selectedLineStop = ref<null | string>(null);

const selectedLineStopTimes = ref<string[]>([]);

const selectLine = async (line: number | null, withRouteChange = true) => {
    selectedLine.value = line;
    selectedLineStop.value = null;

    if (line === null) {
        selectedLineStops.value = [];
    } else {
        selectedLineStops.value = await store.dispatch(StoreAction.GetLineStops, line);
    }

    if (withRouteChange) {
        router.push({
            ...router.currentRoute.value,
            query: {
                line
            }
        });
    }
};

const selectLineStop = async (stop: string | null) => {
    selectedLineStop.value = stop;

    selectedLineStopTimes.value = await store.dispatch(StoreAction.GetTimesForLineStop, {
        line: selectedLine.value,
        stop
    });
};

const lineFromQuery = () => {
    const { line } = router.currentRoute.value.query;

    if (line && typeof line === 'string') {
        const lineNumber = parseInt(line);

        if (lines.value.includes(lineNumber)) {
            return lineNumber;
        }
    }

    return null;
};

onBeforeMount(async () => {
    const line = lineFromQuery();

    if (line) {
        await selectLine(line, false);
    }
});

watch(
    () => router.currentRoute.value.fullPath,
    async () => {
        const line = lineFromQuery();

        if (line !== selectedLine.value) {
            await selectLine(line, false);
        }
    }
);
</script>

<style lang="scss" scoped>
.bus-lines-page {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 50vh 50vh;
    gap: 1rem;
    height: 100%;

    .bus-lines-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .line-button {
        min-width: 3.375rem;
        text-align: center;
        justify-content: center;
    }

    @include desktop {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto 1fr;

        .bus-line-select-card {
            grid-column: 1 / span 2;
        }
    }
}
</style>
