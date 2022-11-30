import NextLink from "next/link";

export function Game({ title, description, href, image }) {
  return (
      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.sky.50)),var(--link-grid-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--link-grid-hover-bg:theme(colors.slate.800)]" />
          <div className="relative overflow-hidden rounded-xl p-6">
              <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
                  <NextLink href={href}>
                      <a target="_blank">
                          <span className="absolute -inset-px rounded-xl" />
                          {title}
                      </a>
                  </NextLink>
              </h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                  {description}
              </p>
              <img src={image} alt={description} width="40%" className="m-auto" />
          </div>
      </div>
  )
}
