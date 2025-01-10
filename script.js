const restaurantList = [
    {
        restaurant: "Mcdonalds",
        specialite: "Burgers",
        imageUrl:
            "https://cdn-s-www.bienpublic.com/images/1083206F-AD80-431F-A8C4-F38D78323E32/NW_raw/si-son-installation-se-confirme-le-restaurant-mcdonald-s-de-montbard-serait-le-deuxieme-de-haute-cote-d-or-apres-celui-de-chatillon-(photo)-ouvert-en-fevrier-2013-comme-norauto-l-enseigne-devrait-s-installer-au-premier-semestre-2015-photo-archives-lbp-1571906832.jpg",
        id: 1,
    },
    {
        restaurant: "Subway",
        specialite: "Sandwichs",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Subway_in_Stanhope%2C_NJ.jpg/1920px-Subway_in_Stanhope%2C_NJ.jpg",
        id: 2,
    },
    {
        restaurant: "Chicken Spot",
        specialite: "Poulets frits",
        imageUrl:
            "https://img.lacarte.menu/storage/media/company_gallery/22965414/conversions/contribution_gallery.jpg",
        id: 3,
    },
    {
        restaurant: "O'Tacos",
        specialite: "Tacos",
        imageUrl:
            "https://www.toute-la-franchise.com/images/zoom/news/xl/547840.jpg",
        id: 4,
    },
    {
        restaurant: "Pizza Hut",
        specialite: "Pizza",
        imageUrl:
            "https://media.istockphoto.com/id/1482241677/fr/photo/restaurant-pizza-hut-pizza-hut-offre-des-pizzas-et-des-boissons-livr%C3%A9es-%C3%A0-emporter-et-en.jpg?s=1024x1024&w=is&k=20&c=GRc84SrUzrhlYnpmu7abegNG83wsa_QxdzlgpSowQls=",
        id: 5,
    },
    {
        restaurant: "Istanbull Grill",
        specialite: "Kebab",
        imageUrl:
            "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/303998917_506322388162021_1612837328357790497_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EJalLrBsDBgQ7kNvgHBGMvl&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=AW2u29WpVDtwkLLyykaPg-E&oh=00_AYCS7-3tOkPuJm6EpP-b8tdX_cmIQ_2AmBq-DbDsjS8sDA&oe=67875605",
        id: 6,
    },
    {
        restaurant: "Taco Bell",
        specialite: "Tex-Mex",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Taco_Bell%2C_Camilla_%28cropped%29.JPG/2560px-Taco_Bell%2C_Camilla_%28cropped%29.JPG",
        id: 6,
    },
];

function writeDom() {
    restaurantList.forEach((restaurant) => {
        const articleContainer = document.querySelector(".row");
        articleContainer.innerHTML += `<article class="col">
            <div class="card shadow-sm">
                <img src="${restaurant.imageUrl}" class="card-img-top" alt="${restaurant.restaurant}">
                <div class="card-body">
                    <h3 class="card-title">${restaurant.restaurant}</h3>
                    <p class="card-text">${restaurant.specialite}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button"
                                    class="btn btn-sm btn-outline-secondary view"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    data-edit-id="${restaurant.id}"
                                    >View
                            </button>
                            <button type="button"
                                    class="btn btn-sm btn-outline-secondary edit"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    data-edit-id="${restaurant.id}"
                                    >Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>`;
    });
}

writeDom();

let editButtons = document.querySelectorAll(".edit");
editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        editModal(e.target.getAttribute("data-edit-id"));
    });
});

let viewButtons = document.querySelectorAll(".view");
viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        viewModal(e.target.getAttribute("data-edit-id"));
    });
});

function modifyModal(modalTitle, modalBody) {
    document.querySelector(".modal-title").textContent = modalTitle;
    document.querySelector(".modal-body").innerHTML = modalBody;
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>`;
}

function viewModal(restaurantId) {
    const result = restaurantList.findIndex(
        (restaurant) => restaurant.id === parseInt(restaurantId)
    );
    const modalBody = `<img src="${restaurantList[result].imageUrl}" alt="${restaurantList[result].specialite}" class="img-fluid" />`;
    modifyModal(restaurantList[result].specialite, modalBody);
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>`;
}

function editModal(restaurantId) {
    const result = restaurantList.findIndex(
        (restaurant) => restaurant.id === parseInt(restaurantId)
    );
    fetch("./form.html").then((data) => {
        data.text().then((form) => {
            const selectedrestaurant = restaurantList[result];
            modifyModal("Modification des informations", form);
            modifyFom({
                restaurant: selectedrestaurant.restaurant,
                specialite: selectedrestaurant.specialite,
                imageUrl: selectedrestaurant.imageUrl,
            });
            document
                .querySelector('button[type="submit"]')
                .addEventListener("click", () =>
                    updaterestaurants(
                        restaurant.value,
                        specialite.value,
                        imageUrl.value,
                        restaurantId
                    )
                );
        });
    });
}

function modifyFom(restaurantData) {
    const form = document.querySelector("form");
    form.restaurant.value = restaurantData.restaurant;
    form.specialite.value = restaurantData.specialite;
    form.imageUrl.value = restaurantData.imageUrl;
}

function updaterestaurants(specialite, restaurant, imageUrl, restaurantId) {
    const index = restaurantList.findIndex(
        (restaurant) => restaurant.id === parseInt(restaurantId)
    );

    restaurantList[index].specialite = specialite;
    restaurantList[index].restaurant = restaurant;
    restaurantList[index].imageUrl = imageUrl;
    document.querySelector(".row").innerHTML = "";
    writeDom();
    editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editModal(e.target.getAttribute("data-edit-id"));
        });
    });

    viewButtons = document.querySelectorAll(".view");
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            viewModal(e.target.getAttribute("data-edit-id"));
        });
    });
}
