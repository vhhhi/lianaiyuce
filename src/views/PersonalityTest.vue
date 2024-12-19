<template>
  <div class="personality-test">
    <div v-if="loading" class="loading">
      加载中...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="test-content">
      <!-- 测试内容 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      testData: null
    }
  },
  async created() {
    try {
      this.loading = true
      // 获取测试数据
      this.testData = await this.fetchTestData()
    } catch (err) {
      this.error = '加载测试内容失败，请稍后重试'
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script> 