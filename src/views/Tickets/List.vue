<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            class="float-right"
                            color="primary"
                            to="/tickets/create"
                            >Create Ticket</v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-data-table
                            :headers="headers"
                            :items="$store.getters['tickets/getTickets']"
                            :items-per-page="5"
                        >
                            <template v-slot:item.create_at="{ item }">
                                {{ parseDate(item.create_at) }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn
                                    text
                                    small
                                    color="secondary"
                                    @click="showAddNoteDialog(item)"
                                >
                                    Add note
                                </v-btn>
                                <v-btn
                                    :to="`/tickets/view/${item.id_ticket}`"
                                    text
                                    small
                                    color="secondary"
                                    >View</v-btn
                                >
                                <v-btn
                                    text
                                    small
                                    color="secondary"
                                    @click="showEditTicketDialog(item)"
                                    >Edit</v-btn
                                >
                                <v-btn
                                    text
                                    small
                                    color="error"
                                    @click="toggleDeleteDialog(item)"
                                    >Delete</v-btn
                                >
                            </template>
                        </v-data-table></v-col
                    >
                </v-row>
            </v-card-text>
        </v-card>
        <delete-dialog
            title="Delete"
            message="Are you sure you want to delete this ticket?"
            buttonLabelConfirm="Delete"
            buttonLabelCancel="No, keep it"
            :show-dialog="showDeleteDialog"
            @confirm-delete="deleteTicket()"
            @cancel-delete="showDeleteDialog = false"
        />
        <v-dialog v-model="addNotedialog" max-width="400">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-icon class="float-right" @click="addNotedialog = false"
                        >fa-window-close</v-icon
                    >
                </v-card-title>
                <v-card-text>
                    <create-notes
                        @note-created="addNotedialog = false"
                        :ticket="TempTicketForAddNote"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="editTicketDialog" max-width="400">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-icon
                        class="float-right"
                        @click="editTicketDialog = false"
                        >fa-window-close</v-icon
                    >
                </v-card-title>
                <v-card-text>
                    <edit-ticket
                        @ticket-updated="confirmTicketUpdated()"
                        :ticket="tempTicketForEdit"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import deleteDialog from '@/components/Interface/DeleteDialog';
import createNotes from '@/components/Tickets/Notes/Create';
import editTicket from '@/components/Tickets/Edit';
import moment from 'moment';

export default {
    components: { deleteDialog, createNotes, editTicket },
    mounted() {
        this.requestTickets();
    },
    data() {
        return {
            headers: [
                { text: '#', align: 'left', value: 'id_ticket' },
                { text: 'Subject', value: 'subject' },
                { text: 'Employee(s)', value: 'all_employees' },
                { text: 'Date', value: 'create_at' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions' }
            ],
            showDeleteDialog: false,
            tempTicketToDelete: {},
            addNotedialog: false,
            TempTicketForAddNote: '',
            editTicketDialog: false,
            tempTicketForEdit: ''
        };
    },
    methods: {
        requestTickets() {
            this.$store
                .dispatch('tickets/get')
                .then(response => {
                    this.$store.commit('tickets/SET_TICKETS', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        toggleDeleteDialog(ticket) {
            this.tempTicketToDelete = ticket;
            this.showDeleteDialog = true;
        },
        deleteTicket() {
            this.$store
                .dispatch('tickets/delete', this.tempTicketToDelete.id_ticket)
                .then(response => {
                    this.requestTickets();
                    this.showDeleteDialog = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showAddNoteDialog(ticket) {
            this.TempTicketForAddNote = ticket;
            this.addNotedialog = true;
        },
        showEditTicketDialog(ticket) {
            this.tempTicketForEdit = ticket;
            this.editTicketDialog = true;
        },
        confirmTicketUpdated() {
            this.requestTickets()
            this.editTicketDialog = false;
        },
        parseDate(date) {
            return moment(date).format('DD/MM/YYYY');
        }
    }
};
</script>