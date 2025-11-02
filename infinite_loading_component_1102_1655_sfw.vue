// 代码生成时间: 2025-11-02 16:55:13
// 引入 axios 用于发起 HTTP 请求
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'InfiniteLoading',
  props: {
    // 传递给组件的 URL 属性
    url: {
      type: String,
      required: true
    },
    // 传递给组件的参数对象，用于请求 URL
    params: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const items = ref([]);
    const isLoading = ref(false);
    const page = ref(1);
    const containerHeight = ref(0);

    // 用于存储可取消的请求
    let cancelToken;

    // 请求数据的函数
    const fetchData = async () => {
      isLoading.value = true;
      try {
        // 如果存在取消令牌，则取消之前的请求
        if (cancelToken) cancelToken.cancel('Operation canceled due to new request.');
        cancelToken = axios.CancelToken.source();
        // 发起 HTTP 请求
        const response = await axios.get(props.url, {
          params: {
            ...props.params,
            page: page.value,
          },
          cancelToken: cancelToken.token
        });
        // 将新请求的数据添加到列表中
        items.value = [...items.value, ...response.data];
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      } finally {
        isLoading.value = false;
      }
    };

    // 初始化数据
    onMounted(() => {
      fetchData();
      // 监听滚动事件以加载更多数据
      window.addEventListener('scroll', handleScroll);
    });

    // 移除滚动事件监听器
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // 处理滚动事件的函数
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      if (nearBottom && !isLoading.value) {
        page.value++;
        fetchData();
      }
    };

    return {
      items,
      isLoading,
      containerHeight,
    };
  }
}
</script>

<style scoped>
/* 组件样式 */
.infinite-loading-container {
  overflow-y: auto;
}

.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.loading {
  text-align: center;
  padding: 10px;
}
</style>

<!-- 组件文档 -->
<!--
@component InfiniteLoading
@prop {String} url - 请求数据的 URL
@prop {Object} params - 请求 URL 的参数对象
-->
