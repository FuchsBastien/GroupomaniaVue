<template>
   <div class="container">
      <form> 
         <div class="form-group mt-3">
            <label for="content">Créer une publication</label>
            <!--v-on:keyup = évènement click de la touche enter-->
            <textarea class="form-control mt-4" v-model.trim= "article.content" v-on:keyup.enter="postArticle" id="content" rows="3" placeholder="Quoi de neuf?" required></textarea>
         </div>

         <div class="form-group mt-3">
            <input class="form-control-file" aria-label="envoi image" @change="onSelect" accept="image/*" type="file" id="image">
         </div>

         <div class="preview_picture">
            <img class = "picture" v-if="picturePreview" :src="picturePreview"/>
         </div>

         <p v-if="errorArticle" class="mt-2 text-danger"> Veuillez écrire un contenu ou partager une image</p>

         <button class ="btn btn-primary mt-4 mb-4" v-on:click.prevent="postArticle">Partager</button>
      </form>
   </div>  
</template>


<script>
   import axios from 'axios'

   export default {
      name :'CreateArticle',
      
      data : function () {
         return {
            article : {
               userId: localStorage.getItem('Id'),
               content : '',
               imageUrl : ''
            },

            errorArticle : false,

            picturePreview : "",
         }
      },

      methods : { 
         postArticle () {
            if (this.article.content == '' && this.article.imageUrl == '') {
               this.errorArticle = true
               return
            }
            else {
               if (this.article.imageUrl == '') {
                  axios.post ('http://localhost:3000/api/articles/', this.article, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                  .then(()=>{
                  console.log('réussite!!');
                  //crée un lien avec le composant allArticle pour faire une action
                  this.$emit('articleCree');
                  this.clearData();
                  this.errorArticle = false
                  })
                  .catch((err)=>{
                     console.log(err.response.data);
                     window.alert(err.response.data);
                     this.errorArticle = false
                  });  
               } 
               else { 
                    if (this.article.content == '') {
                     const formData = new FormData()
                     formData.append('userId', this.article.userId);
                     formData.append('imageUrl', this.article.imageUrl);
               
                     axios.post ('http://localhost:3000/api/articles/', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                     .then(()=>{
                        console.log('réussite!!');
                        this.$emit('articleCree');
                        this.clearData();
                        this.errorArticle = false
                     })
                     .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                        this.errorArticle = false
                     });
                  }
                  else {
                     const formData = new FormData()
                     formData.append('userId', this.article.userId);
                     formData.append('content', this.article.content);
                     formData.append('imageUrl', this.article.imageUrl);
               
                     axios.post ('http://localhost:3000/api/articles/', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                     .then(()=>{
                        console.log('réussite!!');
                        this.$emit('articleCree');
                        this.clearData();
                        this.errorArticle = false
                     })
                     .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                        this.errorArticle = false
                     });   
                  }
               } 
           }
         },

         //vide les valeurs de data
         clearData() {
            this.article.content = '';
            this.article.imageUrl = '';
            this.picturePreview ='';
         },

         onSelect(event) {
            this.article.imageUrl = event.target.files[0];    
            this.picturePreview = URL.createObjectURL(this.article.imageUrl);
            console.log(event);
         },
      },
   }
</script>


<style scoped>
   .container {
      border : solid 2px #f3e9f1;
      margin-bottom: 50px;
      border-radius: 20px;
      width: 55%;
      background-color: white;
   }

   @media screen and (max-width: 640px) {
      .container {
         width: 90%;
      }
   }

   .picture {
      width: 400px;
      height : 200px;
      object-fit: contain;
      margin: 20px 0px 20px 0px;
   }

   @media screen and (max-width: 640px) {
      .picture {
         width: 250px;
      }
   }
   
   .form-control {
      width: 65%;
      margin-left : auto;
      margin-right : auto; 
      background-color: #dfe3ee;
      border-radius: 15px;
   }

   @media screen and (max-width: 640px) {
      .form-control {
         width: 90%; 
      }
   }
   
   label {
      color: orangered;
      font-size: 40px;  
      margin-top: 20px;
   }

   @media screen and (max-width: 640px) {
      label {
         font-size: 25px; 
      }
   }
   
   h1 {
      text-align: center;
      margin: 20px 0px 20px 0px;
      color: orangered;
      padding: 20px;
   }
</style>