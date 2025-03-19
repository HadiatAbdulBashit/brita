const estimateReadTime = (content: string): string => {
  const match = content.match(/\[\+(\d+) chars\]/);
  const extraChars = match ? parseInt(match[1], 10) : 0;
  const totalChars = content.replace(/\[\+\d+ chars\]/, "").length + extraChars;
  const words = totalChars / 5;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export default estimateReadTime;
