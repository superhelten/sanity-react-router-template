import {useRouteLoaderData} from 'react-router'

import type {Route} from '../+types/root'

export function useRootLoaderData() {
  const data: Route.ComponentProps['loaderData'] | undefined =
    useRouteLoaderData(`root`)

  return data!
}
