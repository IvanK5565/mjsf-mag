import { ref, computed, onMounted, onUnmounted } from "vue";

type Breakpoints = Record<string, number>;

interface UseBreakpointsOptions {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  [key: string]: number | undefined;
}

// Простий composable для прослуховування подій
function useEventListener(
  target: EventTarget,
  event: string,
  handler: (event: Event) => void
) {
  onMounted(() => target.addEventListener(event, handler));
  onUnmounted(() => target.removeEventListener(event, handler));
}

export function useBreakpoints(customBreakpoints?: UseBreakpointsOptions) {
  const defaultBreakpoints: Breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
  };

  const breakpoints: Breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

  const width = ref(window.innerWidth);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  useEventListener(window, "resize", updateWidth);

  // computed для стандартних брейкпоінтів
  const isMobile = computed(() => width.value < (breakpoints.tablet ?? 1024));
  const isTablet = computed(
    () => width.value >= (breakpoints.tablet ?? 1024) && width.value < (breakpoints.desktop ?? 1440)
  );
  const isDesktop = computed(() => width.value >= (breakpoints.desktop ?? 1440));

  // Функції перевірки по назві брейкпоінта
  const greater = (name: keyof Breakpoints) => computed(() => width.value >= (breakpoints[name] ?? 0));
  const smaller = (name: keyof Breakpoints) => computed(() => width.value < (breakpoints[name] ?? 0));
  const between = (min: keyof Breakpoints, max: keyof Breakpoints) =>
    computed(() => width.value >= (breakpoints[min] ?? 0) && width.value < (breakpoints[max] ?? Infinity));

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    greater,
    smaller,
    between,
  };
}