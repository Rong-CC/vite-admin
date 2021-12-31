/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-12-30 17:19:31
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-12-31 14:17:45
 */
import { mount } from '@vue/test-utils'
import List from '@/List/index.vue'

// eslint-disable-next-line no-undef
test('displays message', async () => {
  const wrapper = await mount(List, {
    props: {
      msg: 'test msg'
    }
  })
  console.log(wrapper.vm)
  // const shallowWrapper = await shallow(List)
  // console.log(shallowWrapper,'shallow')
  // eslint-disable-next-line no-undef
  expect(wrapper.find('h1').text()).toBe('test msg')
  // it('button click')
  // expect(wrapper.find('button').text()).toBe('count is: 0')
  // await wrapper.find('button').trigger('click')
  // expect(wrapper.find('button').text()).toBe('count is: 1')
})
