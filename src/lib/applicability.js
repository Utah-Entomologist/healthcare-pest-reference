/**
 * Which authorities on this reference reach a facility profile, and why.
 *
 * One function, used by the Pest Compliance Map, the Model Scope of Work page, and the
 * per-state scope-of-work Word files built at `astro build`, so the three can never disagree.
 *
 * `a` is a facility profile: { state, op, ice, kitchen, usms, udc, slco, lexipol }
 *   state   two-letter code, 'OTHER', or '' when no state is chosen
 *   op      'county' | 'state' | 'bop' | 'private'
 *   ice     'none' | 'pbnds' | 'nds' | 'unsure'
 *   kitchen, usms, udc, slco  booleans (udc and slco are Utah-only questions)
 *   lexipol  boolean: the agency's policy manual is Lexipol's custody manual (absent = false)
 *
 * `ctx` carries the data the decision needs: { AUTH_STATE, AUTH_SCOPE, OSHA_PUBLIC, STATE_NAMES }.
 * Returns { s: 'applies' | 'check' | 'na', why } or null when the authority does not reach the profile.
 */

/** Utah authorities that the map treats as state authorities without a `state` code. */
export const UTAH_KEYS = ['udc', 'r392', 'r687', 'slco', 'grama'];

const NO_FOOD = 'No food is prepared on site.';
const PRIVATE_DEFAULT = 'Written for local jails. Whether it reaches a privately operated facility depends on whose prisoners it holds and on its agreement; confirm with the inspecting agency.';

function A(why) { return { s: 'applies', why }; }
function C(why) { return { s: 'check', why }; }
function N(why) { return { s: 'na', why }; }

export function stateNameOf(code, STATE_NAMES) {
  if (code === 'OTHER') return 'Another state';
  return STATE_NAMES[code] || '';
}

export function status(key, a, ctx) {
  const { AUTH_STATE, AUTH_SCOPE, OSHA_PUBLIC, STATE_NAMES } = ctx;
  const UT = a.state === 'UT';
  const pub = a.op === 'county' || a.op === 'state';
  if (AUTH_STATE[key]) {
    if (a.state !== AUTH_STATE[key] || a.op === 'bop') return null;
    const sc = AUTH_SCOPE[key] || {};
    if (sc.kitchenOnly && !a.kitchen) return N(NO_FOOD);
    if (sc[a.op]) return { s: sc[a.op].s, why: sc[a.op].why };
    return a.op === 'private' ? C(PRIVATE_DEFAULT) : null;
  }
  switch (key) {
    case 'osha':
      if (a.op === 'private') return A('A private-sector workplace, covered by federal OSHA or by a State Plan that covers the private sector.');
      if (a.op === 'bop') return C('How OSHA requirements reach a federal employer is not established on this reference.');
      if (UT) return A("Utah's State Plan covers state and local government workers, and Utah rule R614-1-4 incorporates Part 1910.");
      if (a.state === 'NY') return A("New York's Public Employee Safety and Health program covers public employees (Labor Law § 27-a), and 12 NYCRR 800.3 adopts Part 1910 (July 1, 2021 edition) for them.");
      if (OSHA_PUBLIC[a.state] === 'none') return N('OSHA: ' + stateNameOf(a.state, STATE_NAMES) + ' has no State Plan, and state and local government workers are not covered by federal OSHA.');
      if (OSHA_PUBLIC[a.state] === 'plan') return C('OSHA lists ' + stateNameOf(a.state, STATE_NAMES) + "'s State Plan as covering state and local government workers; its adoption of 1910.141 is not verified here.");
      return C('Depends on whether your state runs an OSHA-approved State Plan that covers public employers.');
    case 'fda':
      if (!a.kitchen) return N(NO_FOOD);
      if (UT) return A('Utah adopts the 2022 Food Code through R392-100, which does not exempt jails or prisons.');
      if (a.ice === 'nds') return A('ICE NDS 2019 Standard 4.1 directs compliance with the most recent FDA food code.');
      if (a.state === 'NY') return N("New York's Department of Health has not adopted the FDA Food Code; food service follows 10 NYCRR Subpart 14-1, listed under New York.");
      return C("Depends on your state's adoption of the Food Code and on who inspects your kitchen.");
    case 'r392':
      if (!UT) return null;
      return a.kitchen ? A('Utah food service establishments; the exemption list does not include jails or prisons.') : N(NO_FOOD);
    case 'r687':
      if (!UT) return null;
      return a.op === 'bop' ? C('Governs pesticide application in Utah; its reach onto federal property is not established here.') : A('Every commercial pesticide application in Utah, and staff use of restricted use pesticides.');
    case 'udc':
      if (!UT || a.op === 'bop') return null;
      if (a.op === 'state') return A('State prisons are Utah Department of Corrections facilities.');
      if (a.udc) return A('The facility houses offenders under Utah Department of Corrections jurisdiction.');
      return N('Applies to facilities housing offenders under Utah Department of Corrections jurisdiction.');
    case 'slco':
      if (!UT || !a.slco || a.op === 'bop') return null;
      return A('Correctional institutions in Salt Lake County. Whether the 2007 text has been amended is being confirmed.');
    case 'grama':
      if (!UT || a.op === 'bop') return null;
      return pub ? A('Records of Utah governmental entities, including county jails and state prisons.') : C("Governs records held by governmental entities, including records of a contractor's services.");
    case 'pbnds12':
    case 'pbnds41':
      if (a.ice === 'pbnds') return (key === 'pbnds41' && !a.kitchen) ? N(NO_FOOD) : A('The ICE agreement uses PBNDS 2011.');
      if (a.ice === 'unsure') return C('Confirm which standard set your ICE agreement uses.');
      return null;
    case 'nds11':
    case 'nds41':
      if (a.ice === 'nds') return (key === 'nds41' && !a.kitchen) ? N(NO_FOOD) : A('The ICE agreement uses NDS 2019.');
      if (a.ice === 'unsure') return C('Confirm which standard set your ICE agreement uses.');
      return null;
    case 'usms':
      return a.usms ? A('To the extent the Marshals Service detention agreement incorporates the handbook.') : null;
    case 'bop1614':
      return a.op === 'bop' ? A('Bureau-owned or -operated facilities.') : null;
    case 'bop4700':
      if (a.op !== 'bop') return null;
      return a.kitchen ? A('The Bureau Food Service program.') : N(NO_FOOD);
    case 'lexipol':
      if (!a.lexipol || a.op === 'bop') return null;
      return A("The agency adopted Lexipol's custody manual as its policy. Confirm Policy 805's wording in your edition; agencies can edit their manuals.");
  }
  return null;
}

/** Every authority's status for a profile, in AUTHORITIES order. */
export function activeFor(a, keys, ctx) {
  const active = {};
  keys.forEach((k) => { const st = status(k, a, ctx); if (st) active[k] = st; });
  return active;
}

/** Build the ctx object from the compliance map data. */
export function contextFrom(AUTHORITIES, STATES, OSHA_PUBLIC) {
  return {
    AUTH_STATE: Object.fromEntries(AUTHORITIES.filter((x) => x.state).map((x) => [x.key, x.state])),
    AUTH_SCOPE: Object.fromEntries(AUTHORITIES.filter((x) => x.scope).map((x) => [x.key, x.scope])),
    OSHA_PUBLIC,
    STATE_NAMES: Object.fromEntries(STATES.map((s) => [s.code, s.name]))
  };
}
