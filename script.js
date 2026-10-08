const whatsappNumber = "5567999683180";

const services = [
  {
    name: "Página de Vendas",
    description: "Página de vendas com layout moderno, foco em conversão e mensagens que guiam o cliente até a ação.",
    icon: "🌐"
  },
  {
    name: "Site Institucional",
    description: "Presença digital profissional para mostrar serviços, valores, projetos e aumentar a confiança da marca.",
    icon: "💼"
  },
  {
    name: "Banner Promocional",
    description: "Arte visual para campanhas, redes sociais e divulgação de ofertas com visual atrativo e objetivo claro.",
    icon: "🖼️"
  },
];

const serviceList = document.getElementById("services-list");
const serviceSelect = document.getElementById("service");
const form = document.getElementById("service-form");

function renderServices() {
  if (!serviceList) return;

  services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-icon" aria-hidden="true">${service.icon}</div>
      <div class="service-info">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="service-footer">
          <button type="button" class="service-button">Selecionar</button>
        </div>
      </div>
    `;

    const button = card.querySelector(".service-button");
    button.addEventListener("click", () => {
      if (!serviceSelect) return;

      serviceSelect.value = service.name;
      serviceSelect.scrollIntoView({ behavior: "smooth", block: "center" });
      serviceSelect.focus();
    });

    serviceList.appendChild(card);
  });
}

function populateServiceOptions() {
  if (!serviceSelect) return;

  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });

  const otherOption = document.createElement("option");
  otherOption.value = "Outros";
  otherOption.textContent = "Outros";
  serviceSelect.appendChild(otherOption);
}

function buildWhatsAppMessage(formData) {
  const getValue = (fieldName) => String(formData.get(fieldName) || "").trim();
  const name = getValue("name");
  const phone = getValue("phone");
  const service = getValue("service");
  const date = getValue("date");
  const details = getValue("details");

  const message = [
    "Olá! Gostaria de solicitar um serviço.",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Serviço: ${service}`,
    `Data disponível: ${date || "a combinar"}`,
    `Detalhes: ${details || "Sem detalhes adicionais"}`
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const messageUrl = buildWhatsAppMessage(formData);
    window.location.href = messageUrl;
  });
}

renderServices();
populateServiceOptions();
