var serverURL = 'http://localhost:3000'
new Vue({
  el:'#app',
  components: {
      wysiwyg: vueWysiwyg.default.component,
    },
  data:{
    statusShow: '',
    isSearch: '',
    titleSearch: '',
    id:'',
    title: '',
    content: '',
    status: '',
    articles: [],
    // findArticles: [],
    articlesPublish: [],
    articlesDraft: []
  },
    
  created(){
    this.loadArticle()
  },

  watch: {
      titleSearch: function(val){
        console.log(this.titleSearch);
        
        this.articlesDraft = this.articles.filter(el=>{
          if(el.status==0){
            if (el.title.toLowerCase().match(new RegExp(val.toLowerCase()))){
              return el
            }
          }
        })
        this.articlesPublish = this.articles.filter(el=>{
          if(el.status==1){
            if (el.title.toLowerCase().match(new RegExp(val.toLowerCase()))){
              return el
            }
          }
        })
      }
  },

  methods:{
    loadArticle(){
      axios.get(serverURL+'/articles')
      .then(({data})=>{
        data = data.reverse()
        this.articles = (data)

        this.articlesDraft = data.filter(el=>{
          if(el.status==0){
            return el
          }
        })

        this.articlesPublish = data.filter(el=>{
          if(el.status==1){
            return el
          }
        })
      })
    },
    addArticle(){
      axios.post(serverURL+'/articles', {title: this.title, content: this.content, status: this.status})
      .then(({data})=>{
        if(this.status==1) {
          this.articlesPublish.unshift(data)
          console.log("MASUK 2");
          this.statusShow = '1'
        }else if(this.status==0){
          this.articlesDraft.unshift(data)
          console.log("MASUK 1");
          this.statusShow = '2'
        } 
      })
      .catch(err=>{
        console.log(err);
      })
    },
    actionEditArticle(){
      let indexArticle
      axios.put(serverURL+'/articles/'+this.id, {title: this.title, content: this.content, status: this.status})
      .then(({data})=>{
      
        console.log(indexArticle);
        
        this.statusShow = '1'
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    editArticle(id, title, content, status){
      this.id = id,
      this.title = title,
      this.content = content,
      this.status = status,
      this.statusShow = "4"
    },
    actionDeleteArticle(id){
      axios.delete(serverURL+'/articles/'+id)
      .then((response)=>{
        console.log(response);
        
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    deleteArticle(id){
      this.id = id
    },
    showSearch(){
      if(!this.isSearch) this.isSearch = "true"
      else this.isSearch = ""
    },
    showPublished(){
      this.statusShow='1'
    },
    showDraft(){
      this.statusShow='2'
    },
    showCreate(){
      this.id = '',
      this.title = '',
      this.content = '',
      this.status = '',
      this.statusShow='3'
    }

  },
  
});

Vue.component('articles-publish',{
  props: ['articleChild','statusShow'],
  data(){
    return{
    }
  },
  methods:{
    edit(){
      this.$emit('edit', {_id, title, content, status})
    }
  },
  template: `
  <div style="width: 90%;">
    <b-card v-if="statusShow=='1'" v-for="article in articleChild" >    
      <artikel v-bind:artikels="article"> </artikel>
      <!--<artikel v-bind:artikels="article" @click:edit(_id, title, content, status)="edit(_id, title, content, status)"> </artikel>-->
    </b-card>
  </div>
  `
})

Vue.component('articles-draft', {
  props:['articleChild', 'statusShow'],
  template:`
  <div style="width: 90%;">
    <b-card class="card" v-if="statusShow=='2'" v-for="article in articleChild" >  
      <artikel v-bind:artikels="article"></artikel>
    </b-card>
  </div>
  `
})

Vue.component('artikel',{
  props: ['artikels'],
  data(){
    return{
      // _id: this.artikels._id, 
      // title: this.artikels.title,
      // content: this.artikels.content,
      // status: this.artikels.status
    }
  },
  methods:{
    // edit(){
    //   this.$emit('edit', {_id: this._id, title: this.title, content:this.content, status:this.status})
    // }
  },
  template: `
  <div>
    <div class="headerCard">
    <b-card-text>
      <h4 class="card-title">{{ artikels.title }}</h4>
    </b-card-text>
      <div>
        <b-button variant="success" size="sm">Edit</b-button>
        <!--<b-button v-on:click="edit(artikels._id, artikels.title, artikels.content, artikels.status)" variant="success" size="sm">Edit</b-button>-->
        <b-button v-on:click="actionDeleteArticle(artikels._id)" variant="danger" size="sm">Delete</b-button>
      </div>
    </div>
    <div>
      <div class="card-text" v-html="artikels.content"></div>
    </div>
  </div>
  `
})


Vue.config.devtools = true;