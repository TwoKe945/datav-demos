import { debounce, once, isElement } from 'lodash-es';
import { reactive, ref, onMounted, onUnmounted } from 'vue';

import type { ComponentPublicInstance } from 'vue';

export type RefreshLayoutSize = () => void;

export interface ExposeWithRefreshLayoutSize {
  refreshLayoutSize: RefreshLayoutSize;
}

function observerDomResize(dom: HTMLElement, callback: () => void) {
  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['class', 'style'],
    attributeOldValue: true,
  });

  return observer;
}

function updateDomSize(dom: HTMLElement, target: { width: number; height: number }) {
  const { clientWidth = 0, clientHeight = 0 } = dom || {};

  if (!dom) {
    console.warn('Failed to get dom node, component rendering may be abnormal!');
  } else if (!clientWidth || !clientHeight) {
    console.warn('Component width or height is 0px, rendering abnormality may occur!');
  }

  target.width = clientWidth;
  target.height = clientHeight;
}

function getRefDom(ref: HTMLElement | ComponentPublicInstance): HTMLElement {
  if (isElement(ref)) {
    return ref as HTMLElement;
  }

  if (isElement((ref as ComponentPublicInstance).$el)) {
    return (ref as ComponentPublicInstance).$el;
  }

  return null as any;
}

export function useResize() {
  const domRef = ref<HTMLElement>();
  const domSizeEffectDisposer: (() => void)[] = [];

  const domSize = reactive({
    width: 0,
    height: 0,
  });

  const handleRomSizeChange: RefreshLayoutSize = () => {
    updateDomSize(domRef.value!, domSize);
  };

  const debouncedDomSizeChangeHandler = debounce(handleRomSizeChange, 100);

  /**
   * 自动绑定组件DomRef
   */
  const autoBindRef = once((ref) => {
    const dom = getRefDom(ref);
    if (!dom) {
      console.error('Bind Component Dom Ref Failed!');
      return;
    }

    domRef.value = dom;
  });

  onMounted(() => {
    handleRomSizeChange();

    const observer = observerDomResize(domRef.value!, debouncedDomSizeChangeHandler);
    window.addEventListener('resize', debouncedDomSizeChangeHandler);

    domSizeEffectDisposer.push(
      () => {
        observer.disconnect();
      },
      () => {
        window.removeEventListener('resize', debouncedDomSizeChangeHandler);
      }
    );
  });

  onUnmounted(() => {
    domSizeEffectDisposer.forEach((disposer) => disposer());
  });

  /**
   * 可以手动给domRef赋值 或使用autoBindRef来绑定DomRef
   */
  return {
    domSize,
    autoBindRef,
    refreshLayoutSize: handleRomSizeChange,
  };
}
