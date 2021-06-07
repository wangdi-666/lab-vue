<template>
    <div class="home">
        {{homeTitle}}
    </div>
</template>
<script>
import {HOME_TITLE} from '@/config/config.js';
export default {
    data () {
        return {
            homeTitle: HOME_TITLE,
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
    }
</style>
