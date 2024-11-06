import { shallowMount } from '@vue/test-utils';

import NavigationBar from './NavigationBar.vue';

describe('NavigationBar', () => {
    const RouterLinkStub = {
        template: '<a router-link-stub><slot/></a>'
    };
    const BaseCardStub = {
        template: '<div base-card-stub><slot/></div>'
    };

    const NavigationBarFactory = (props: InstanceType<typeof NavigationBar>['$props'] = {}) => {
        return shallowMount(NavigationBar, {
            props,
            global: {
                stubs: {
                    BaseCard: BaseCardStub,
                    RouterLink: RouterLinkStub
                }
            }
        });
    };

    it('renders proper html markup', () => {
        const wrapper = NavigationBarFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders both Bus Lines and Stops links', () => {
        const wrapper = NavigationBarFactory();

        expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(2);
    });

    it('renders proper Bus Lines link text and path', () => {
        const wrapper = NavigationBarFactory();
        const [link] = wrapper.findAllComponents(RouterLinkStub);

        expect(link.text()).toBe('Bus Lines');
        expect(link.attributes()['to']).toBe('/');
    });

    it('renders proper Stops link text and path', () => {
        const wrapper = NavigationBarFactory();
        const [, link] = wrapper.findAllComponents(RouterLinkStub);

        expect(link.text()).toBe('Stops');
        expect(link.attributes()['to']).toBe('/stops');
    });
});
