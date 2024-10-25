const codingConcepts = [
  {
    title: "Variables",
    description: "Containers for storing data values."
  },
  {
    title: "Functions",
    description: "Reusable blocks of code that perform a specific task."
  },
  {
    title: "Loops",
    description: "Control structures for repeating a block of code."
  },
  {
    title: "Arrays",
    description: "A collection of elements, stored in a single variable."
  },
  {
    title: "Objects",
    description: "Data structures that store data in key-value pairs."
  },
  {
    title: "Conditional Statements",
    description: "Decision-making structures in programming."
  }
];

const conceptsContainer = document.getElementById('coding-concepts');

// Dynamically create cards for each coding concept
codingConcepts.forEach(concept => {
  const card = document.createElement('div');
  card.classList.add('concept-card');

  const title = document.createElement('h2');
  title.classList.add('concept-title');
  title.textContent = concept.title;

  const description = document.createElement('p');
  description.classList.add('concept-description');
  description.textContent = concept.description;

  card.appendChild(title);
  card.appendChild(description);
  conceptsContainer.appendChild(card);
});
