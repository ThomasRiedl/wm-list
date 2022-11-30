import { toRefs, reactive } from 'vue';

export function useFetch(url, options) {
  //https://vuejs.org/api/reactivity-core.html#reactive
  const state = reactive({
    error: null,
    loading: false,
    data: null,
    ready: false,
  });
  console.log('Options: ' + options);

  fetch(url, options)
    .then((res) => {
      console.log('status: ' + res.status);
      return res.json();
    })
    .then((d) => {
      //console.log('data ' + d.flags[0].country);
      return (state.data = d);
    })
    .catch((err) => {
      state.error = err;
      //console.log('Error occured: ' + err);
    })
    .finally(() => {
      state.loading = false;
      state.ready = true;
    });
  return { ...toRefs(state) };
}
