export function formatRepoTitle(repoName) {
  const lowCaseWords = ['for', 'in', 'at', 'to', 'and', 'on', 'by'];

  const words = repoName.split('-');
  const capitalized = words.map(name => {
    if (!lowCaseWords.includes(name.toLowerCase())) {
      return name[0].toUpperCase() + name.slice(1);
    }
    return name.toLowerCase();
  });
  return capitalized.join(' ');
}
