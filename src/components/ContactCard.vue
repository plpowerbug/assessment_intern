<template>
  <div class="contact-card">
    <h2>{{ contact.name }}</h2>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>Phone:</strong> {{ contact.phone ? contact.phone : 'None' }}</p>
    <p><strong>Company:</strong> {{ contact.company.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.contact-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #e1e1e1;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.contact-card h2 {
  margin: 0 0 15px 0;
  color: #0078d4;
  font-size: 1.8rem;
}

.contact-card p {
  margin: 8px 0;
  color: #444;
  font-size: 1rem;
}
</style>