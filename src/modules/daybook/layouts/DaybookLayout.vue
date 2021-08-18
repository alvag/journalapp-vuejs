<template>
    <Navbar/>

    <div class="d-flex ">
        <div class="col-4">
            <EntryList/>
        </div>

        <div class="col">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Navbar from '@/modules/daybook/components/Navbar';
import EntryList from '@/modules/daybook/components/EntryList';

export default {
    name: 'DaybookLayout',
    components: { EntryList, Navbar }
};
</script>

<style scoped>

</style>
