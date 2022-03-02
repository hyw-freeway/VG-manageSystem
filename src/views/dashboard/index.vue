<template>
  <div class="currentW">
    <el-container
      style="
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      "
    >
      
      <el-main class="mains">
        <el-card class="box-card" v-show="postListPerWeek.length == 0">
          <div v-show="postListPerWeek.length == 0">本周暂无周报</div>
        </el-card>

        <el-collapse accordion class="card">
          <el-collapse-item
            v-for="(item, index) in postListPerWeek"
            :key="index"
            :name="index"
            :disabled="postListPerWeek.length == 0"
          >
            <template slot="title">
               <div class="username"> {{item.author.username}}</div>
               <div class="time text-item">{{item.publishDate}}</div>
             <div class="title text-item"> {{item.title}}</div>
              
              <div class="check">
                <el-link icon="el-icon-view"
                  >查看
                </el-link>
              </div >
              <div class="edit" @click="edit(item.id,item.uid)"  v-if="hasadmin()">
                <el-link icon="el-icon-edit">编辑</el-link>
              </div>
            </template>
            <mavon-editor
              v-model="item.content"
              :subfield="false"
              :boxShadow="false"
              defaultOpen="preview"
              :toolbarsFlag="false"
            />
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getPostsByWeek } from "@/api/article";
import { getDate } from "@/utils/date";

export default {
   name: "Dashboard",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      postListPerWeek: [],
    };
  },
  methods: {
     hasadmin() {
      this.roles = localStorage.getItem('roles'),
      console.log(this.roles.indexOf('admin'))
      if (this.roles.indexOf('admin') !== -1) {
        return true
      } else {
        return false
      }
    },
    edit(aid,uid) {
      console.log(aid)
      this.$router.push({ path: '/example/edit', query: { Aid: aid, Uid: uid }})
    },
  },
  created() {
    let time = getDate();
    console.log(time)
    getPostsByWeek(time).then((r) => {
      console.log(r)
      this.postListPerWeek = r;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.text-item{

  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #909399;
}
.currentW {
  margin: 0 10px auto 10px;
}
.username{
  font-size: 35px;
  margin-top: -50px;
}
.title{
 position: absolute;
//  left: 105px;  
 left: 30px;
 top:75px; 
color: black;
}
.time{
position: absolute;
font-size: 12px;
top:43px;
 left: 30px;  
}
.tit {
  font-size: 22px;
  margin-top: 16px;
  margin-bottom: 0px;
}
.mains {
  margin-top: 0px;
  padding-top: 10px;
}
.card {
  margin-top: 0px;
}

.el-collapse-item__header {
  font-size: 15px !important;
  padding-left: 30px;
  height: 130px ;
    
  
}
.el-collapse-item{
  position: relative;
 
}
.check{
position: absolute;
left: 140px;
top:20px;

}
.edit{
  position: absolute;
  // left: 380px;
  left: 200px;
top:20px;
}

</style>
