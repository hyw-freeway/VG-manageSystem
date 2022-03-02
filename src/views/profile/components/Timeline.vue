<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of list" :key="index" :timestamp="item.publishDate" placement="top" >
        <el-card :key="index" @click.native="show(index,item)">
          <h4>{{ item.title }}</h4>
          <mavon-editor
          v-show="isShow"
              v-model="list[index].content"
              :subfield="false"
              :box-shadow="false"
              default-open="preview"
              :toolbars-flag="false"
            />
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import {fetchArticle} from "@/api/article"
export default {
  data() {
    return {
      isShow:false,
      uid:1,
      list:[],
      timeline: [
        {
          timestamp: '2019-4-20',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2019/4/20 20:46'
        },
        {
          timestamp: '2019/4/21',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2019/4/21 20:46'
        },
        {
          timestamp: '2019/4/22',
          title: 'Build Template',
          content: 'PanJiaChen committed 2019/4/22 20:46'
        },
        {
          timestamp: '2019/4/23',
          title: 'Release New Version',
          content: 'PanJiaChen committed 2019/4/23 20:46'
        }
      ]
    }
  },
  created() {
    this.uid=localStorage.getItem("uid")
   this.getArticle() 
  
  },
  methods: {
    show(index,item){
      if(this.list[index].content==item.content){
      this.isShow=!this.isShow
      return this.isShow
      }
   
    },
    getArticle(){
      this.listLoading = true
      fetchArticle(this.uid).then(response => {
        this.list = response
         console.log(this.list)
        this.listLoading = false
      })
    }
  },
}
</script>
