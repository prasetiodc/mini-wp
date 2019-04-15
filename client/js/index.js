var serverURL = 'http://localhost:3000'
let app = new Vue({
  el:'#app',
  components: {
      wysiwyg: vueWysiwyg.default.component,
    },
  data:{
    token: '',
    
    //user
    fullname:'',
    email:'',
    password:'',

    //for condition
    isLogin: '0',
    statusShow: '',
    isSearch: '',
    titleSearch: '',

    //article
    id:'',
    title: '',
    content: '',
    status: '',
    author: '',
    featured_image: null,

    //list article
    articles: [],
    articlesPublish: [],
    articlesDraft: []
  },
    
  created(){
    this.loadArticle()
  },

  watch: {
      titleSearch: function(val){
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
      axios.get(serverURL+'/articles', 
      {
        headers: {
          auth : this.token
        }
      })
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
      console.log(this.featured_image);

      const fd = new FormData()
      fd.append('image', this.featured_image, this.featured_image.name)

      this.featured_image = fd
      console.log(this.featured_image);
      
      
      axios.post(serverURL+'/articles', {title: this.title, content: this.content, status: this.status, featured_image: this.featured_image}, 
      {
        headers: {
          auth : this.token
        }
      })
      .then(({data})=>{
        if(this.status==1) {
          this.loadArticle()
          this.statusShow = '1'
        }else if(this.status==0){
          this.loadArticle()
          this.statusShow = '2'
        } 
      })
      .catch(err=>{
        console.log();
        
        console.log(err);
      })
    },

    actionEditArticle(){

      axios.put(serverURL+'/articles/'+this.id, {title: this.title, content: this.content, status: this.status}, 
      {
        headers: {
          auth : this.token
        }
      })
      .then(({data})=>{
        this.loadArticle()
        app.statusShow = '1'
      })
      .catch(err=>{
        console.log("ERROR EDIT");
        
        console.log(err);
      })
    },
    
    editArticle({id, title, content, status}){
      this.id = id,
      this.title = title,
      this.content = content,
      this.status = status,
      this.statusShow = '4'
    },

    actionDeleteArticle(id){
      axios.delete(serverURL+'/articles/'+id, 
      {
        headers: {
          auth : this.token
        }
      })
      .then((response)=>{
        this.loadArticle()
        
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
    },

    signup(){
      axios.post(serverURL+'/users',{fullname:this.fullname, email:this.email, password:this.password})
      .then(({data})=>{
        this.fullname=''
        this.email=''
        this.password=''
        swal("Registered!", "You has registered!", "success");
        this.isLogin='0'
      })
      .catch(err=>{
        swal("", "FAIL", "warning");
        console.log("REGISTER ERROR");
      })
    },

    signin(){
      axios.post(serverURL+'/users/login',{email:this.email, password:this.password})
      .then(({data})=>{
        this.token = data
        this.email=''
        this.password=''
        this.isLogin='1'
      })
      .catch(err=>{
        swal("", "LOGIN FAIL", "warning");

        console.log("LOGIN ERROR");
      })
    },
    register(){
      this.isLogin="2"
    },
    uploadImage(event) {
      this.featured_image = event.target.files[0]
    }
  }
  
});

Vue.component('articles-publish',{
  props: ['articleChild','statusShow'],
  methods:{
    hapus(id){
      this.$emit('delete', id)
    },
    sunting({id, title, content, status}){
      this.$emit('edit', {id, title, content, status})
    },
  },
  template: `
  <div style="width: 90%;">
    <b-card v-if="statusShow=='1'" v-for="article in articleChild" >    
      <artikel v-bind:artikels="article" v-on:edit="sunting" v-on:delete="hapus" > </artikel>
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
    return {
      // id : artikels._id,
      // title : atrikels.title,
      // content : artikels.content,
      // status : artikels.status,
      // // image : artikels.featured_image
      // nameModal : artikels._id
    }
  },
  methods:{
    editArticle(id, title, content, status){
      this.$emit('edit', {id, title, content, status})
    },
    actionDeleteArticle(id){
      this.$emit('delete', id)
    }
  },
  template: `
  <div>
    <div class="headerCard">
    <b-card-text> 
      <h4 class="card-title">{{ artikels.title }}</h4>
    </b-card-text>
      <div>
      <b-button block v-b-modal.nameModal size="sm">Detail</b-button>
         
        <b-button v-on:click="editArticle(artikels._id, artikels.title, artikels.content, artikels.status)" variant="success" size="sm">Edit</b-button>
        <b-button v-on:click="actionDeleteArticle(artikels._id)" variant="danger" size="sm">Delete</b-button>
      </div>
    </div>
    <!--<div class="card-text" v-html="artikels.content"></div>-->

    <b-modal id="nameModal" scrollable title="Scrollable Content">
      <p class="my-4">
        <div class="card-text" v-html="content"></div>
      </p>
    </b-modal>
    
  </div>
  `
})


function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;

  axios.post(serverURL+'/users/googleLogin',{
      token: id_token
    })
  .then(({data}) => {
    app.token = data
    app.isLogin = '1'    

    localStorage.setItem('token', data)

  })
  .catch((jqXHR, textStatus) => {
    console.log(`request failed ${textStatus}`)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      app.statusShow = '0'
      app.token = ''
      console.log('User signed out.')
    });
}

Vue.config.devtools = true;

