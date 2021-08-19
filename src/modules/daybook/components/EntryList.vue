<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input v-model="term"
                   class="form-control"
                   placeholder="Buscar entrada" type="text">
        </div>

        <div class="entry-scrollarea">
            <div v-for="entry in entriesByTerm" :key="entry.id">
                <Entry :entry="entry"/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
import { getEntriesByTerm } from '@/modules/daybook/store/journal/journalGetters';

export default {
    name: 'EntryList',
    components: {
        Entry: defineAsyncComponent( () => import('./Entry') )
    },
    computed: {
        ...mapGetters( 'journal', ['getEntriesByTerm'] ),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term );
        }
    },
    data() {
        return {
            term: ''
        };
    }
};
</script>

<style lang="scss" scoped>

.entry-list-container {
    border-right : 1px solid #2C3E50;
    height       : calc(100vh - 56px);
}

.entry-scrollarea {
    height     : calc(100vh - 105px);
    overflow-y : scroll;
}

</style>
