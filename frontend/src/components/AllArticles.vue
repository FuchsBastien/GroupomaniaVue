<template>
   <div v-if="userToken" class ="all_articles">
      <h1>Bienvenue {{userFirstname}}!</h1> 

      <CreateArticle v-on:articleCree="loadArticles()"></CreateArticle>

      <div class="container mt-5">
         <h1>Tous les Articles Publiés</h1>
              
         <!--{{articlesArray}}-->

         <div class="articles_frame">
            <!--crée une boucle du tableau articlesArray (v-for= "article in articlesArray") pour créer des const article (v-bind:key = "article")-->
            <div class="article" v-bind:key = "article" v-for= "article of articlesArray"> 
               <div class ="article_avatar">
                  <div class ="article_avatar1">
                     <div v-if="userAdmin == 'true'">
                        <router-link v-bind:to ="`/accounts/${article.User.id}`">
                           <!--article.user = objet (élèment du tableau articlesArray)-->
                           <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="article.User.imageUrl" v-bind:alt="article.User.firstname">
                        </router-link>
                     </div>
                     <div v-else>
                           <img class="iconUser rounded-circle mb-2 me-2" width="100" v-bind:src="article.User.imageUrl" v-bind:alt="article.User.firstname">
                     </div>

                     <div v-if="userAdmin == 'true'">
                        <router-link v-bind:to ="`/accounts/${article.User.id}`"> 
                           <p class= "name" :style="{cursor: 'pointer'}">{{article.User.firstname}} {{article.User.lastname}}</p>
                           <p class= "date">le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                        </router-link>
                     </div>
                     <div v-else>
                           <p class= "name">{{article.User.firstname}} {{article.User.lastname}}</p>
                           <p class= "date">le {{article.createdAt [8]}}{{article.createdAt [9]}}-{{article.createdAt [5]}}{{article.createdAt [6]}}-{{article.createdAt [0]}}{{article.createdAt [1]}}{{article.createdAt [2]}}{{article.createdAt [3]}}</p>
                     </div>
                  </div>

                  <div class ="article_avatar2">
                     <button class="modifyOrDelete" title="Modifier ou supprimer votre article" v-if ="article.userId == userId" v-on:click ="displayModifyOrDelete(article.id)" >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                     </button>

                     <button class="modifyOrDelete" title="Modifier ou supprimer votre article" v-else-if="userAdmin == 'true'" v-on:click ="displayModifyOrDelete(article.id)" >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                     </button>
                  </div>
               </div>

              
               <!--bouton modifier (user de l'article)-->
               <div v-if ="article.userId == userId && article.id == displayModifyOrDeleteButton">
                   <!--v-on:keyup = évènement click du bouton modifier lance la fonction setIdArticleToUpdate avec comme paramètre article.id (élèment tableau articlesArray)-->
                  <button class="btn-success rounded" v-on:click="setIdArticleToUpdate(article.id), contentArticleTextarea(article.content)">Modifier</button>
                  <br><br>
                  <br>
               </div>


               <!--carte modification article-->
               <div class="container-modify" v-if="idArticleUpdate == article.id"  > 
                  <div class="div-modify">
                     <div class="titre">
                        <p>Modifier votre publication</p>
                        <button class="cancelModify" v-on:click="setIdArticleToUpdate(null), clearData()">
                           <i class="fa-solid fa-xmark"></i>
                        </button>
                     </div>

                     <textarea class= "form-control mb-2" v-model= "updatearticle.content" id="content"  rows="1" placeholder= "Modifier votre contenu..."></textarea>
                     
                     <div>
                        <img class = "picture" v-if="picturePreview" :src="picturePreview"/>
                        <p class = "noPicture" v-else-if="deletePictureData == true"></p>
                        <img class = image-article-modify v-else-if="article.imageUrl " v-bind:src="article.imageUrl" alt="image article">
                     </div>
      
                     <div>
                        <button class="cancelPicture" v-if="picturePreview" v-on:click="clearPicturePrewiew()">
                           <i class="fa-solid fa-xmark"></i>
                        </button>
                        <p class = "noPicture" v-else-if="deletePictureData == true">Aucune image</p>
                        <button class="deletePicture" v-else-if="article.imageUrl" v-on:click="deletePicture(article.imageUrl)">
                           <i class="fa-solid fa-xmark"></i>
                        </button>
                     </div>

                     <div>
                        <input class="form-control-file" aria-label="envoi image" @change="onSelect" accept="image/*" type="file"  id="image">
                        <br>
                       
                        <p v-if="errorUpdateArticle" class="mt-2 text-danger"> Veuillez modifier le contenu ou l'image</p>
                        <br><br>
                        <button class="btn-success rounded" v-on:click="modifyArticle(article.id)">Enregistrer</button> 
                     </div>
                  </div>  
               </div>

               
               <!--bouton supprimer (admin)-->
               <div v-else-if="userAdmin == 'true' && article.id == displayModifyOrDeleteButton">
                  <button class="btn-danger ms-2 rounded" v-on:click="deleteArticle(article.id)">Supprimer</button>
                  <br>
               </div>

               <!--bouton supprimer (user de l'article)-->
               <div v-else-if ="article.userId == userId && article.id == displayModifyOrDeleteButton">
                  <button class="btn-danger ms-2 rounded" v-on:click="deleteArticle(article.id)">Supprimer</button>
                  <br>
               </div>

               <!--contenu article-->
               <p class="article_content">{{article.content}}</p>
               

               <!--image article-->
               <img class="image_article" v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="image article">
               
               <br>
               <!-- poster/supprimer like -->
               <div class="like"  v-on:click="setIdArticleToLike(article.id), loadLikeByArticleByUser()">
                  <i class="fa-solid fa-thumbs-up"></i>
                  <!--nombre likes-->
                  <span>{{article.nbLike}}</span>
               </div>

               <br>
               <!--Au clic on stocke l'ID de l'article choisi-->
               <a v-if= "article.nbComment == 0" class="comments" v-on:click="setToUpdate(article.id)"> Aucun commentaire !</a>
               <a v-else-if= "article.nbComment == 1" class="comments" v-on:click="setToUpdate(article.id)"> {{article.nbComment}} commentaire</a>
               <a v-else class="comments" v-on:click="setToUpdate(article.id)">{{article.nbComment}} commentaires</a>

               <br>
               <!--Si l'ID de l'article = ID stocké on fait apparaitre le composant CreateComment en y transférant
               l'ID stocké-->
               <div v-if="idArticleStorage == article.id">
                  <CreateComment v-on:commentCree="loadArticles()" v-bind:idArticleTransfert = idArticleStorage ></CreateComment>
               </div>
            </div>      
         </div>   
      </div> 
      
      <div id="pagetop" v-show="scY > 300" v-on:click="toTop">
         <a class="bloc-button btn btn-d scrollToTop showScrollTop"><span class="fa fa-chevron-up"></span></a>
      </div>   
   </div>
  
   <div class ="no-connect" v-else>
      <h1>Accès non autorisé</h1>
      <p >Veuillez vous <router-link class="createAccount" v-bind:to="`/`">connecter</router-link> ou vous <router-link class="createAccount" v-bind:to="`/signup`">inscrire</router-link></p>
   </div>
</template>



<script>
   import axios from 'axios'
   import CreateArticle from "./CreateArticle.vue"
   import CreateComment from "./CreateComment.vue"

   export default {
      name: 'AllArticles',

      components: {
         CreateArticle,
         CreateComment
      },

      data : function () {
         return {
            articlesArray : [],

            updatearticle : {
               content : '',  
               imageUrl : ''
            },

            
            userToken: localStorage.getItem('token'),
            userId: localStorage.getItem('Id'),
            userAdmin: localStorage.getItem('Admin'),
            userFirstname: localStorage.getItem('Firstname'),
            userLastname: localStorage.getItem('Lastname'),
            userActivate: localStorage.getItem('Activate'),

            picturePreview : null,

            idArticleUpdate: null,


            likeArray : [],
            
            like : {
               articleId : '',
               userId: localStorage.getItem('Id'),
            },


            idArticleStorage : null,

            errorUpdateArticle : false,

            scTimer: 0,
            scY: 0,

            displayModifyOrDeleteButton : "",

            deletePictureData : false,

         } 
      },

      mounted() {
      window.addEventListener('scroll', this.handleScroll);
      },

      created(){
      this.loadArticles ()
      },  


      methods : { 
         //charge les articles
         loadArticles () {
            axios.get ("http://localhost:3000/api/articles/", {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(articles => {
               //console.log(articles);
               this.articlesArray = articles.data
               console.log(this.articlesArray)
               this.idForEachArticle (this.articlesArray)
            }) 
         },

         //pour chaque article on applique les fonction loadComments et loadLikes avec en paramètre l"id de l'article
         idForEachArticle (articlesArray) {
            //console.log(articlesArray); 
            articlesArray.forEach ((article) => {
               console.log(article);
               this.loadComments (article.id, article);
               this.loadLikes (article.id, article);
            })
         },

         //charge le nombre de commentaires par article
         loadComments (article_id, article) { 
         axios.get (`http://localhost:3000/api/articles/${article_id}/comments`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(response => {
               console.log(response.data);
               article.nbComment = response.data.length
               console.log(article.nbComment);
            })
         },


         //charge le nombre de likes par article
         loadLikes (article_id, article) {
            axios.get (`http://localhost:3000/api/likes/${article_id}`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(response => {
               console.log(response.data);
               article.nbLike = response.data.length
               console.log(article.nbLike);
            })
         },


        
   

         //enregistre l'id de l'article à modifier au clic des ...
         displayModifyOrDelete(article_id){
            this.displayModifyOrDeleteButton = article_id;
            console.log(this.displayModifyOrDeleteButton);
         },

         //enregistre le contenu de l'article à afficher dans la fenêtre de modification au clic de "modifier"
         contentArticleTextarea(article_content){
            this.updatearticle.content = article_content;
         },

         //enregistre l'id de l'article à modifier au clic de "modifier"
         setIdArticleToUpdate(article_id){
            this.idArticleUpdate = article_id
            console.log(this.idArticleUpdate);
         },

        
      
         //supprime la miniature de l'image de l'article dans la fenêtre de modification
         deletePicture(imageUrl) {
            console.log(imageUrl)
            this.imageUrl == this.updatearticle.imageUrl;
            this.updatearticle.imageUrl == '';
            console.log(this.updatearticle);
            this.deletePictureData = true;
            console.log(this.deletePictureData);
         },

         //affiche la miniature de l'image telechargée
         onSelect(event) {
            this.updatearticle.imageUrl = event.target.files[0];    
            this.picturePreview = URL.createObjectURL(this.updatearticle.imageUrl);
         },

         //supprime la miniature de l'image telechargée
         clearPicturePrewiew() {
            this.picturePreview ='';
            this.updatearticle.imageUrl = '';
         },

         //modifie l'article
         modifyArticle(id) {
            if (this.updatearticle.content == '' && this.updatearticle.imageUrl == '') {
               this.errorUpdateArticle = true
               return
            }

            else {

            if (this.deletePictureData == true) {
               const formData = new FormData()
               formData.append('content', this.updatearticle.content);
               formData.append('imageUrl', this.updatearticle.imageUrl); 

               axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                  .then(() => {
                     console.log('article modifié');
                     this.loadArticles();
                     this.clearData();
                     this.idArticleUpdate = null;
                     this.errorUpdateArticle = false;
                     this.deletePictureData = false
                  })
                  .catch((error) => {
                     console.log(error.message);
                  })    
               }


               if (this.updatearticle.imageUrl == '') {
                  const formData = new FormData()
                  formData.append('content', this.updatearticle.content);

                  axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                     .then(() => {
                        console.log('article modifié');
                        this.loadArticles();
                        this.clearData();
                        this.idArticleUpdate = null;
                        this.errorUpdateArticle = false;
                     })
                     .catch((error) => {
                        console.log(error.message);
                     })
               }
               else {
                  if (this.updatearticle.content == '') {
                     const formData = new FormData()
                     formData.append('imageUrl', this.updatearticle.imageUrl); 

                     axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                        .then(() => {
                           console.log('article modifié');
                           this.loadArticles();
                           this.clearData();
                           this.idArticleUpdate = null;
                           this.errorUpdateArticle = false;
                        })
                        .catch((error) => {
                           console.log(error.message);
                        })        
                  }
                  else {
                     const formData = new FormData()
                     formData.append('content', this.updatearticle.content);
                     formData.append('imageUrl', this.updatearticle.imageUrl); 

                     axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                        .then(() => {
                           console.log('article modifié');
                           this.loadArticles();
                           this.clearData();
                           this.idArticleUpdate = null;
                           this.errorUpdateArticle = false;
                        })
                        .catch((error) => {
                           console.log(error.message);
                        })        
                  }
               }
            }
         },

         //supprime l'article
         deleteArticle(id) {
            axios.delete("http://localhost:3000/api/articles/"+id, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
               .then(() => {
                  console.log('article supprimé!');
                  this.articlesArray.splice(1)
                  this.loadArticles();
               })
               .catch((error) => {
                  console.log(error.message);
            })
         },


          //enregistre l'id de l'article au clic de l'image like
         setIdArticleToLike(article_id){
            this.like.articleId = article_id
            console.log(this.like);
         },

         
         //charge le like de l'article selon l'utilisateur au clic de l'image like
         loadLikeByArticleByUser ()  {
            axios.get (`http://localhost:3000/api/likes/${this.like.articleId}/${this.like.userId}`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(response => {
               this.likeArray = response.data
               console.log(this.likeArray.length)
               const likeArrayLength = this.likeArray.length
               this.likes(likeArrayLength)
            })      
         },

         
         //créer ou supprimer le like unique de l'utilisateur
         likes (likeArrayLength) {
            if (likeArrayLength == 0) {
               console.log(this.likeArray.length);
               axios.post ("http://localhost:3000/api/likes",this.like, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
               .then(()=>{
                  console.log('like créé!');
                  this.loadArticles();
                  this.clearData();
               })
               .catch((err)=>{
                  console.log(err.response.data);
               })   
            }
            else {
               console.log(this.likeArray);
               console.log(this.likeArray[0].id);
               axios.delete(`http://localhost:3000/api/likes/${this.likeArray[0].id}`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
               .then(() => {
                  console.log('like supprimé!');
                  this.loadArticles();
                  this.clearData();
               })
               .catch((error) => {
                  console.log(error.message);
               })
            }          
         },
         


         //supprime les nouvelles données enregistrées 
         clearData() {
            this.updatearticle.content = '';
            this.updatearticle.imageUrl = '';
            this.picturePreview ='';
            this.like.articleId = '';
            this.likeArray = [];
         },

         //enregistre l'id de l'article au clic de "commenter" pour l'envoyer au composant "createComment"
         setToUpdate(article_id){
            this.idArticleStorage = article_id
         },

         //bouton scroll
         handleScroll() {
            if (this.scTimer) return;
               this.scTimer = setTimeout(() => {
               this.scY = window.scrollY;
               clearTimeout(this.scTimer);
               this.scTimer = 0;
            }, 100);
         },

         //remonter la page
         toTop () {
            window.scrollTo({
               top: 0,
               behavior: "smooth"
            });
         },
      },
   }
</script>


<style scoped>
   .all_articles{
      background-color: #dfe3ee;
      margin-top : 180px;
   }

   @media screen and (max-width: 640px) {
      .all_articles {
         margin-top : 100px; 
      }
   }

   .bloc-button.btn.btn-d.scrollToTop.showScrollTop {
     margin-bottom: 100px; 
   }

   .btn-d, .btn-d:focus, .btn-d:hover {
      background: rgba(0,0,0,.3);
   }

   .scrollToTop{
      width: 40px;
      height: 40px;
      position: fixed;
      bottom: 20px;
      right: 50px;
      opacity: 1;
      z-index: 500;
      transition: all .3s ease-in-out;
   }

   @media screen and (max-width: 640px) {
      .scrollToTop {
         right: 10px; 
      }
   }

   .showScrollTop{
      font-size: 14px;
      opacity: 1;
   }

   .article_publish {
      display: block;
      margin: auto;
      margin-bottom: 20px;
   }

   .articles_frame {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
   }

   @media screen and (max-width: 640px) {
      .articles_frame {
          width: 95%; 
      }
   }

   .article {
      border : solid 2px #f3e9f1;
      padding: 20px;
      overflow: hidden;
      margin-bottom: 50px;
      border-radius: 20px;
      background-color: white;
   }

   .article_avatar{
      display : flex; 
      align-items: center;
      justify-content: space-around;
   }

   .article_avatar1{
     display : flex; 
     align-items: center;
     margin-left: 15%;
   }

   .modifyOrDelete{
      border: none;
      font-size: 1.2em;
      background-color: white;
      transform: translateX(-160%);
   }
   
   .name {
      font-weight : bold;  
      margin :0;
   }

   .article_content {
      margin: 20px 0px 20px 0px;
      word-wrap: break-word;
   }

   .date {
      color: #575757;
   }

   .article_avatar a:hover {
      color: orangered;
   }


   .like {
      display: flex;
      justify-content: center;
      align-items: center;

   }

   .comments:hover {
      color: orangered;
      cursor: pointer;  
    }

   .comments {
      font-size: 25px;
   }

   .form-control {
      width: 65%;
      margin-left : auto;
      margin-right : auto; 
      background-color: #dfe3ee;
      border-radius: 15px;
   }



    @media screen and (min-width : 320px) and (max-width : 414px) {
      .picture {
         width: 200px;
      }
   }

     @media screen and (max-width: 640px) {
      .form-control {
         width: 90%; 
      }
   }

   .iconUser.rounded-circle.mb-2.me-2 {
      border: solid 1px gray;
      height: 100px;
      width: 100px;
   }

      @media screen and (max-width: 640px) {
      .iconUser.rounded-circle.mb-2.me-2 {
         height: 50px;
         width: 50px;; 
      }
   }

   .no-connect {
      margin-top : 250px;
   }

   .no-connect a {
      text-decoration: underline;
   }

   .no-connect a:hover {
      color: orangered;
   } 
   
   h1,h2 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }

   p {
      color: black;
   }

   a {
      color: black;
      text-decoration: none;
   }

   .image_article {
      width: 70%;
      height : 500px max-content;
      object-fit: contain;
      margin: 20px 0px 20px 0px;
   }


    /*@media screen and (min-width : 320px) and (max-width : 375px) {
      .image_article {
         width: 240px;
         height : 160px max-content;
      }
   }*/

       /*@media screen and (min-width : 376px) and (max-width : 414px) {
      .image_article {
         width: 300px;
         height : 160px max-content;
      }
   }*/

     /*@media screen and (min-width : 415px) and (max-width : 768px) {
      .image_article {
         width: 500px;
         height : 160px max-content;
      }
   }*/

   .container.mt-5{
      padding-bottom: 100px;
   }

   .container-modify {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,0.6);
      
      z-index: 1;
            
   }

   .div-modify {
      width: 50%;
      margin-top: 300px;
      margin-left: auto;
      margin-right: auto;
      padding: 30px;
      height: auto;
      background-color: white;
      box-shadow: rgb(122, 44, 44);
      border-radius: 20px;
   }

   .titre {
      display: flex;
      justify-content: center;
      align-items: baseline;
   }

   .image-article-modify, .picture {
      width: 50%;
      height : 500px max-content;
      object-fit: contain;
      margin: 20px 0px 0px 0px;
   }

       @media screen and (min-width : 320px) and (max-width : 414px) {
      .image-article-modify, .picture {
         height : 160px max-content;
      }
   }

     @media screen and (min-width : 415px) and (max-width : 768px) {
      .image-article-modify, .picture {
         height : 360px max-content;
      }
   }

   .cancelModify, .cancelPicture, .deletePicture {
      background-color: white;
      border: none;
      border-radius: 50%;
   }   

</style>