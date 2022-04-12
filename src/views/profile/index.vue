<template>
  <div class="app-container"
   >
   <el-container>
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" :uid="id"/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
    <el-footer>
        <p class="footer">Copyright  2021 西南交通大学. All rights reserved. 蜀ICP备2022007878号 <a href="https://beian.miit.gov.cn/#/Integrated/index" style="color:#909399;text-decoration:none" >https://beian.miit.gov.cn/#/Integrated/index</a></p>
      </el-footer>
   </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {

      user: {},
      activeTab: 'activity',
      id:null
    }
  },

  created() {
    this.id=localStorage.getItem("uid")
    this.getUser()

  },
  methods: {
    getUser() {
      this.user = {
         name: localStorage.getItem("username"),
        role: localStorage.getItem("roles"),
        email: 'admin@test.com',

      }
    }
  }
}
</script>
<style scoped>
.el-container{
  min-height: 100vh;
  align-items: center;
}
.footer{
  height: 1vh;
  width: 100%;
  align-items: center;
  color: #909399;
}
</style>
