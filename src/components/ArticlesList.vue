<template>
  <div>
    <ArticleItem
      v-for="article in articles"
      :key="article.publishedAt"
      :article="article"
    />
  </div>
</template>
<script>
import ArticleItem from "./ArticleItem"
import axios from "axios"
export default {
  name: "ArticlesList",
  static: {
    visibleItemsPerPageCount: 2
  },
  data() {
    return {
      articles: [],
      currentPage: 1,
      pageCount: 0
    }
  },
  components: {
    ArticleItem,
  },
  async mounted() {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.get(
        `?country=us&page=1&pageSize=${
          this.$options.static.visibleItemsPerPageCount
        }&category=business&apiKey=065703927c66462286554ada16a686a1`
      )
      this.articles = data.articles
      this.pageCount = Math.ceil(
        data.totalResults / this.$options.static.visibleItemsPerPageCount
      )
    } catch (error) {
      throw error
    }
  },
   methods: {
    async pageChangeHandle(value) {
      switch (value) {
        case 'next':
          this.currentPage += 1
          break
        case 'previous':
          this.currentPage -= 1
          break
        default:
          this.currentPage = value
      }
      const { data } = await axios.get(
        `?country=us&page=${this.currentPage}&pageSize=${
          this.$options.static.visibleItemsPerPageCount
        }&category=business&apiKey=065703927c66462286554ada16a686a1`
      )
      this.articles = data.articles
    }
  }
}
}
</script>