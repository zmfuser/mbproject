<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item1 v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem1 from './SidebarItem'

export default {
  components: { SidebarItem1 },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
     // return this.$router.options.routes
      return this.$store.state.user.route;
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
