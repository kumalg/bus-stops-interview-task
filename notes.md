1. In TypeScript 4.5.5 this is incorrect:

```ts
const validate = (value: unknown) => {
    if (typeof value !== 'object' || !value) {
        return false;
    }

    if (!('line' in value) || typeof value.line !== 'number') {
        return false;
    }

    return true;
};
```

so I was forced to do some workaround here in [validateBusStop](/src/assets/validator.ts)

2. This repo build app with Webpack (which is no longer recommended since Vite is the new default), but has Vitest installed, I change that to Jest to avoid incompatibility issues - best way would be to upgrade to Vite & Vitest, but I wasn't sure if that would meet the requirements.

3. Vuex is deprecated and Pinia is a new standard in Vue 3. Vuex is not great with TypeScript in some cases, like it doesn't know what actions or getters are available when using `useStore()` composable. But again - I wasn't sure if changing to Pinia would meet the requirements.
