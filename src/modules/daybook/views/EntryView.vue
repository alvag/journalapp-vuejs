<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ date.day }}</span>
            <span class="fs-3 mx-1">{{ date.month }}</span>
            <span class="fs-4 mx-2 fw-light">{{ date.yearDay }}</span>
        </div>

        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary mx-2">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>

    <hr>

    <div class="d-flex flex-column px-3 h-75">
        <textarea v-model="entry.text"
                  class="form-control shadow-none"
                  placeholder="¿Qué sucedió hoy?"></textarea>
    </div>

    <img alt="entry picture"
         class="img-thumbnail"
         src="https://fotoarte.com.uy/wp-content/uploads/2019/03/Landscape-fotoarte.jpg">

    <Fab icon="fa-save"/>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear';

export default {
    name: 'EntryView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    daa() {
        return {
            entry: null
        };
    },
    created() {
        this.loadEntry();
    },
    computed: {
        ...mapGetters( 'journal', ['getEntryById'] ),
        date() {
            return getDayMonthYear( this.entry.date );
        }
    },
    components: {
        Fab: defineAsyncComponent( () => import('../components/Fab') )
    },
    methods: {
        loadEntry() {
            const entry = this.getEntryById( this.id );
            console.log( entry );
            if ( !entry ) {
                this.$router.push( { name: 'no-entry' } );
            } else {
                this.entry = entry;
            }
        }
    }
};
</script>

<style lang="scss" scoped>

textarea {
    border    : none;
    font-size : 20px;
    height    : 100%;
}

img {
    bottom     : 150px;
    box-shadow : 0 5px 10px rgba($color : #000, $alpha : 0.2);
    position   : fixed;
    right      : 20px;
    width      : 200px;
}

</style>
