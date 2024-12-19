const navigation = [
	{
		id: 1,
		linkText: "Listado de trabajo",
		img: "/Dashboard/handyman/orders.svg",
		href: "/dashboard/handyman/joblisting",
	},
	{
		id: 2,
		linkText: "Gestión de perfil",
		img: "/Dashboard/handyman/editProfile.svg",
		href: "/dashboard/handyman/editprofile",
	},
	{
		id: 3,
		linkText: "Contraseña",
		img: "/Dashboard/client/password.svg",
		href: "/dashboard/handyman/password",
	},

	{
		id: 4,
		linkText: "Mensajes",
		img: "/Dashboard/handyman/messages.svg",
		href: "/dashboard/handyman/messages",
	},
	{
		id: 5,
		linkText: "Historial de trabajo",
		img: "/Dashboard/handyman/orders.svg",
		href: "/dashboard/handyman/orders",
	},
	{
		id: 6,
		linkText: "Revisión y retroalimentación",
		img: "/Dashboard/handyman/paymentPackages.svg",
		href: "/dashboard/handyman/reviewsandfeedback",
	},
	{
		id: 7,
		linkText: "Gestión de suscripción",
		img: "/Dashboard/handyman/messages.svg",
		href: "/dashboard/handyman/subscriptionmanagement",
	},
	{
		id: 8,
		linkText: "Configuración de pago",
		img: "/Dashboard/handyman/messages.svg",
		href: "/dashboard/handyman/paymentsettings",
	},

	{
		id: 9,
		linkText: "Alertas de trabajo",
		img: "/Dashboard/handyman/paymentPackages.svg",
		href: "/dashboard/handyman/jobalert",
	},
];
const statuses = ["terminada", "abierta", "rechazada", "retirada", "aceptada"];
const statusMap={
	pending:"pendiente",
	accepted:"aceptada",
	rejected:"rechazada",
	completed:"terminada",
	withdrawn:"retirada",
	open:"abierta"

}
const handymanPofileImgsSrc = [
	"/Dashboard/handyman/handyman-profile-1.svg",
	"/Dashboard/handyman/handyman-profile-2.svg",
	"/Dashboard/handyman/handyman-profile-3.svg",
	"/Dashboard/handyman/handyman-profile-3.svg",
];
export { handymanPofileImgsSrc, navigation, statuses,statusMap };

