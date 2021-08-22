<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input v-model="term"
                   class="form-control"
                   placeholder="Buscar entrada" type="text">
        </div>

        <div class="my-2 d-flex flex-column">
            <button class="btn btn-primary mx-3" @click="createNewEntry">
                <i class="fa fa-plus-circle"></i>
                Nueva Entrada
            </button>
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
    },
    methods: {
        createNewEntry() {
            this.$router.push( { name: 'entry', params: { id: 'new-entry' } } );
        }
    }
};
</script>

<style lang="scss" scoped>

.entry-list-container {
    border-right : 1px solid #2C3E50;
    height       : calc(100vh - 56px);
}

.entry-scrollarea {
    height     : calc(100vh - 160px);
    overflow-y : auto;
}

</style>
