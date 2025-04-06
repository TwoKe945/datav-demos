import moment from 'moment'
export function useTime() {
  const time = ref(new Date())
  const timer = setInterval(() => {
    time.value = new Date()
  }, 1000)

  onUnmounted(() => {
    clearInterval(timer)
  })

  const nowTimeText = computed(() => {
    return moment(time.value).format('YYYY年MM月DD日  HH:mm:ss')
  })

  return {
    time,
    nowTimeText
  }

}
