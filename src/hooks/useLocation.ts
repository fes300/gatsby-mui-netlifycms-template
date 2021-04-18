import * as t from "io-ts"
import qs from "qs"
import { useLocation } from "@reach/router"
import { BooleanFromString } from "io-ts-types"

export function useQuery() {
  const query = useLocation().search
  return qs.parse(query, { ignoreQueryPrefix: true })
}

export const QueryItem = t.type({
  fakeQueryParam: t.string,
})
export type QueryItem = t.TypeOf<typeof QueryItem>

export function useQueryParam<P extends keyof QueryItem>(paramName: P) {
  const query = useQuery()
  return QueryItem.props[paramName].decode(query[paramName])
}

export function useHash() {
  const hash = useLocation().hash
  return qs.parse(hash.substring(1))
}

export const HashItem = t.type({
  terms: BooleanFromString,
})
export type HashItem = t.TypeOf<typeof HashItem>

export function useHashParam<P extends keyof HashItem>(paramName: P) {
  const hash = useHash()
  return HashItem.props[paramName].decode(hash[paramName])
}
