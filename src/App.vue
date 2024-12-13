<template>
  <div id="app">
    <header>
      <h1>Contacts</h1>
    </header>
    <main>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="contacts-container">
        <ContactCard v-for="contact in contacts" :key="contact.id" :contact="contact" />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ContactCard from './components/ContactCard.vue';

export default {
  name: 'App',
  components: {
    ContactCard,
  },
  setup() {
    const contacts = ref([]);
    const loading = ref(true);

    const fetchContacts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        contacts.value = await response.json();
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchContacts);

    return {
      contacts,
      loading,
    };
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f7f9fc;
  padding: 20px;
}

header {
  background-color: #0078d4;
  color: white;
  padding: 10px 0;
  margin-bottom: 20px;
}

.contacts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.loading {
  font-size: 1.5em;
  color: #555;
}
</style>
