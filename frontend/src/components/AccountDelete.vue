<template>
<div>
    <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card mt-3 mb-3">
                        <h3 class="mt-2">Votre compte a été supprimé avec succès !</h3>
                        <h3 class="mt-2">A bientôt !</h3>
                        <p class="text-center">Vous pouvez toujours vous <router-link v-bind:to="`/signup`">réinscrire</router-link>.</p>
                    </div>
                </div>
            </div>
    </div>
</div>
</template>


<script>
export default {
    name: 'SignupSuccess',
}
</script>

<style scoped>
    .container {
        padding-top : 250px
    }

     label, a, p, h1 {
        color: black;
    }

    a:hover {
        color: orangered;
    }
</style>

  