# Listagens
curl -s http://localhost:3000/livros | jq '.dados | length'
curl -s http://localhost:3000/usuarios | jq '.dados | length'
curl -s http://localhost:3000/emprestimos | jq '.dados | length'

# Busca por ID
curl -s http://localhost:3000/livros/1 | jq '.titulo'
curl -s http://localhost:3000/usuarios/1 | jq '.nome'
curl -s http://localhost:3000/emprestimos/1 | jq '.status'

# Features novas
curl -s http://localhost:3000/livros/disponibilidade | jq '.[0]'
curl -s http://localhost:3000/livros/1/autores | jq
curl -s -X POST http://localhost:3000/emprestimos/marcar-atrasados | jq