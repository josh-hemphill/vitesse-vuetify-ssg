import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import Footer from '../src/components/Footer.vue';

describe('Footer.vue', () => {
	it('should render', () => {
		const wrapper = mount(Footer);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should be interactive', async() => {
		const wrapper = mount(Footer);

		expect(wrapper.find('button.!outline-none').exists()).equal(true);

		await wrapper.get('button.!outline-none').trigger('click');

		wrapper.find('button.!outline-none').
	});
});
