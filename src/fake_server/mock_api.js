import {Factory, Model, createServer} from 'miragejs';

export const setUpServer = () => {
  return createServer({
    models: {
      subject: Model,
    },

    factories: {
      subject: Factory.extend({
        name(i) {
          return `Subject ${i}`;
        },
      }),
    },

    seeds(server) {
      server.createList('subject', 10);
      // server.create('subject', {id: Date.now(), name: 'JS'});
      // server.create('subject', {id: Date.now(), name: 'CSS'});
      // server.create('subject', {id: Date.now(), name: 'NodeJS'});
    },

    routes() {
      this.get('/api/subjects', schema => {
        return schema.subjects.all();
      });

      this.get('/api/subjects/:id', (schema, request) => {
        let id = request.params.id;
        return schema.subjects.find(id);
      });

      this.post('/api/subjects', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.subjects.create({...attrs, id: Date.now()});
      });

      this.delete('/api/subjects/:id', (schema, request) => {
        let id = request.params.id;
        return schema.subjects.find(id).destroy();
      });

      this.put('/api/subject/:id', (schema, request) => {
        let id = request.params.id;
        let {name} = JSON.parse(request.requestBody);
        return schema.subjects.find(id).update({name});
      });
    },
  });
};
