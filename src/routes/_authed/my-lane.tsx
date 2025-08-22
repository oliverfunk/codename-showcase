import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/my-lane')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/my-lane"!</div>
}
