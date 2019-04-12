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

      watch: {
          titleSearch: function(val){
            this.articlesDraft = this.articlesDraft.filter(el=>{
              if(el.status==0){
                if (el.title.toLowerCase().match(new RegExp(val.toLowerCase()))){
                  return el
                }
              }
            })
            this.articlesPublish = this.artiarticlesPublishcles.filter(el=>{
              if(el.status==1){
                if (el.title.toLowerCase().match(new RegExp(val.toLowerCase()))){
                  return el
                }
              }
            })
          }
      },

      methods:{
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
            // console.log(data);

            // this.articlesPublish.forEach((el, index)=>{
            //   if(el._id===data.id){
            //     indexArticle = index
            //   }
            // })
            this.articlesPublish.find()

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

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
  
// formCreateArticle