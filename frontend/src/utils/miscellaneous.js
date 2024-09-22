import DOMPurify from "dompurify";

export const sanitizeHTML = (content, allowedTags = [], allowedAttributes = {}) => {
    const clean = process.browser ? DOMPurify.sanitize(content) : content;
    // return DOMPurify.sanitize(content);
    return clean;

// Manuel olarak izin verilen etiketleri ve öznitelikleri ekleme

/* const parser = new DOMParser();
const doc = parser.parseFromString(clean, 'text/html');

doc.body.querySelectorAll('*').forEach(node => {
  if (!allowedTags.includes(node.tagName.toLowerCase())) {
    node.replaceWith(...node.childNodes);
  } else {
    [...node.attributes].forEach(attr => {
      if (!allowedAttributes[node.tagName.toLowerCase()]?.includes(attr.name)) {
        node.removeAttribute(attr.name);
      }
    });
  }
});

const sanitizedHtml = doc.body.innerHTML;
return sanitizedHtml; */
}