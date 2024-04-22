export async function post(url, data, header = {}) {
     return await fetch(url, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
               ...header
          },
          body: JSON.stringify(data),
     }).then(d => d.json())
}