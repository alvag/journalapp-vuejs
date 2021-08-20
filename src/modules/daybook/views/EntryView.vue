<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ date.day }}</span>
                <span class="fs-3 mx-1">{{ date.month }}</span>
                <span class="fs-4 mx-2 fw-light">{{ date.yearDay }}</span>
            </div>

            <div>
                <button v-if="entry.id" class="btn btn-danger mx-2"
                        @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <button class="btn btn-primary mx-2"
                        @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>

            </div>
        </div>

        <input v-show="false"
               ref="imageSelector"
               accept="image/png, image/jpeg" type="file"
               @change="onSelectedImage">

        <hr>

        <div class="d-flex flex-column px-3 h-75">
        <textarea v-model="entry.text"
                  class="form-control shadow-none"
                  placeholder="¿Qué sucedió hoy?">
        </textarea>
        </div>

        <img v-if="entry.picture && !localImage"
             :src="entry.picture"
             alt="entry picture"
             class="img-thumbnail">

        <img v-if="localImage"
             :src="localImage"
             alt="entry picture"
             class="img-thumbnail">

    </template>

    <Fab icon="fa-save"
         @click="saveEntry"/>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear';
import Swal from 'sweetalert2';
import { fileUpload } from '@/modules/daybook/helpers/fileUpload';

export default {
    name: 'EntryView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            entry: null,
            localImage: null,
            imageFile: null
        };
    },
    created() {
        this.loadEntry();
    },
    watch: {
        id() {
            this.loadEntry();
            this.localImage = null;
            this.imageFile = null;
        }
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
        ...mapActions( 'journal', ['updateEntry', 'createEntry', 'deleteEntry'] ),
        loadEntry() {
            if ( this.id === 'new-entry' ) {
                this.entry = {
                    date: new Date().getTime(),
                    text: ''
                };
            } else {
                const entry = this.getEntryById( this.id );
                if ( entry ) {
                    this.entry = entry;
                } else {
                    this.$router.push( { name: 'no-entry' } );
                }
            }

        },
        async saveEntry() {

            Swal.fire( {
                text: 'Por favor espere...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            } );

            if ( this.imageFile ) {
                this.entry.picture = await fileUpload( this.imageFile );
            }

            if ( this.entry.id ) {
                await this.updateEntry( this.entry );
            } else {
                if ( this.entry.text.trim().length > 0 ) {
                    this.entry = await this.createEntry( this.entry );
                    await this.$router.push( { name: 'entry', params: { id: this.entry.id } } );
                }
            }

            this.imageFile = null;
            this.localImage = null;
            Swal.fire( '', 'Entrada guardada', 'success' );
        },
        async onDeleteEntry() {
            const res = await Swal.fire( {
                title: '¿Está seguro?',
                text: 'Una vez borrado no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, borrar'
            } );

            if ( res.isConfirmed ) {
                await this.deleteEntry( this.entry.id );
                await this.$router.push( { name: 'no-entry' } );
            }


        },
        onSelectImage() {
            this.$refs.imageSelector.click();
        },
        onSelectedImage( event ) {
            this.imageFile = event.target.files[ 0 ];
            if ( this.imageFile ) {
                const fr = new FileReader();
                fr.onload = () => this.localImage = fr.result;
                fr.readAsDataURL( this.imageFile );
            } else {
                this.localImage = null;
            }

            this.$refs.imageSelector.value = null;
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
