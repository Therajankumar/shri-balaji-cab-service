export default function Button({
    children,
    href,
    primary = false
}) {
    return (
        <a
            href={href}
            className={`
            inline-flex
            items-center
            justify-center
            px-7
            py-4
            rounded-full
            font-semibold
            transition-all
            duration-300
            hover:scale-105

            ${
                primary
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
            }
        `}
        >
            {children}
        </a>
    );
}