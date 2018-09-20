<template>
    <router-view></router-view>

</template>

<script>
    import { _sessionStorage} from '../../../assets/js/util'

    export default {
        name: "canteenCart",
        data(){
            return {

            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(){
                if(_sessionStorage('specifications')==0){ // 0大食堂 1小食堂
                    this.$router.replace({
                        'name': 'canteenCartBig',
                    })
                }else{
                    this.$router.replace({
                        'name': 'canteenCartSmall',
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>