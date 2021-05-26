import { createApp } from 'vue'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'
import { addClass, removeClass } from '@/utils/dom'

function createDirectives (component) {
  const relativeClass = 'p-relative'
  const cName = component.name ? component.name : `c${Date.now()}`
  function append (el) {
    // 判断有没有类名, 因为loading组件的position是`absolute`
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeClass)
    }
    // 把Loading挂载到作用的dom下面
    el.appendChild(el[cName].instance.$el)
  }

  function remove (el) {
    removeClass(el, relativeClass)
    el.removeChild(el[cName].instance.$el)
  }
  return {
    // 判断loading的值, 动态创建dom, 插入到对应的节点下面
    /**
     * 在绑定元素的父组件被挂载后调用。
     * @param el: v-loading对应的dom对象
     * @param binding
     */
    mounted (el, binding) {
      // 返回一个提供应用上下文的应用实例。
      const app = createApp(component)
      if (!el[cName]) {
        el[cName] = {}
      }
      // app.mount
      // 返回根组件实例
      // 作用: 将应用实例的根组件挂载在提供的 DOM 元素上。
      el[cName].instance = app.mount(document.createElement('div'))
      const title = binding.arg
      if (typeof title === 'string') {
        el[cName].instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    /**
     * 在包含组件的 VNode 及其子组件的 VNode 更新后调用。
     * @param el
     * @param binding
     */
    updated (el, binding) {
      // 组件更新的时候, title可能也会变
      const title = binding.arg
      if (typeof title === 'string') {
        el[cName].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
}

const loading = createDirectives(Loading)

const noData = createDirectives(NoData)

export default {
  loading,
  noData
}
