<template>
    <div v-if="userToken" id="nav" >
        <img class = img_header_online src='http://localhost:3000/images/logo-online.ico' alt="logo-online">
        <router-link to="/articles">Tous les Articles</router-link> 
        <router-link v-if="userAdmin == 'true'" to="/account">Mon Compte Admin</router-link>
        <router-link v-else to="/account">Mon Compte</router-link>
        <a v-on:click ="LocalstorageClear" class = deconnexion >Déconnexion</a>
    </div>

    <div v-else id="nav" >
        <img class = img_header_offline src='http://localhost:3000/images/logo-offline.png' alt="logo-offline">
    </div>
</template>


<script>
    export default {
        name : 'Header',

        data : function () {
            return {
                userToken: localStorage.getItem('token'),
                userAdmin: localStorage.getItem('Admin'),
            }
        }, 

        methods : { 
            LocalstorageClear () {
                localStorage.clear();
                this.userToken= null; 
                this.$router.push('/');   
            },
        }
    }
</script>


<style scoped>
    #nav {
        position: fixed;
        top : 0;
        left : 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: auto;
        padding: 5px;
        font-size: 1.3em;
        background-color: #2c3e50;;
        height: auto; 
        align-items: center;   
    }

    #nav a {
        font-weight: bold;
        color: #D6D6D6;
        text-decoration: none;
        cursor: pointer;   
    }

    #nav a:hover, #nav a.router-link-exact-active {
        color: pink;
    }

    @media screen and (max-width: 640px) {
        #nav a {
        font-size: 0.6em;
        }
    }

    .img_header_online {
        height: 75px;
        width: 75px;
    }

    @media screen and (max-width: 640px) {
        .img_header_online {
            height: 60px;
            width: 60px;
        }
    }

    .img_header_offline {
        height: 200px;
        width: 450px;
    }

    @media screen and (max-width: 640px) {
        .img_header_offline {
            height: 120px;
            width: 300px;
        }
    }
 </style>