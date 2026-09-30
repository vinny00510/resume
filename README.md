# Vinicius Alvarez Curriculo

Portfolio espacial interativo, responsivo e pronto para GitHub Pages.

## Estrutura
- `index.html`: estrutura do site.
- `style.css`: visual, responsividade, planetas e animacoes.
- `data.js`: experiencias, habilidades, projetos, formacao e certificacoes.
- `app.js`: renderizacao, navegacao, estrelas e interacoes.

## Como personalizar
Edite `data.js`. Para incluir um projeto, copie um objeto dentro de `projects`:

```js
{
  name: "Novo projeto",
  status: "Desenvolvimento",
  description: "Descricao do projeto.",
  technologies: ["Python", "IA"]
}
```

## Publicar no GitHub Pages
1. Extraia o ZIP.
2. Envie o conteudo da pasta para a raiz do repositorio `vinny00510/resume`.
3. No GitHub, abra Settings > Pages.
4. Em Source, selecione Deploy from a branch.
5. Selecione `main` e `/ (root)`, depois Save.
6. O endereco publicado sera o mesmo GitHub Pages do repositorio.

## Observacao
Revise datas, cargos, formacao e certificacoes em `data.js` antes da publicacao.

## Estrutura sem pastas
Todos os arquivos ficam diretamente na raiz do repositorio:

```text
index.html
style.css
app.js
data.js
README.md
```
