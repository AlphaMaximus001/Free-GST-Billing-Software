// v1.10.83 - exports and SEZ supplies under a Letter of Undertaking (LUT,
// form GST RFD-11). A LUT is filed once per financial year; with it an export
// or a supply to an SEZ is billed without IGST (zero-rated). The tax itself is
// zeroed in computeInvoiceTotals (utils.js, totals.lutZeroRated); these are the
// pieces the Settings card, the invoice screen and the printed invoice share.

import { getStateCode, parseLocalDate } from '../utils.js';

// Rule 46 of the CGST Rules: the endorsement an export / SEZ invoice must
// carry, word for word.
export const LUT_DECLARATION = 'SUPPLY MEANT FOR EXPORT/SUPPLY TO SEZ UNIT OR SEZ DEVELOPER FOR AUTHORISED OPERATIONS UNDER BOND OR LETTER OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED TAX';
export const IGST_PAID_DECLARATION = 'SUPPLY MEANT FOR EXPORT/SUPPLY TO SEZ UNIT OR SEZ DEVELOPER FOR AUTHORISED OPERATIONS ON PAYMENT OF INTEGRATED TAX';

// The financial year a date falls in, as the portal writes it: '2026-27'.
export const fyOf = (date) => {
  const d = parseLocalDate(date);
  if (!date || isNaN(d.getTime())) return '';
  const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${y}-${String((y + 1) % 100).padStart(2, '0')}`;
};

// The ARN the portal gives on filing, e.g. AD290426123456X: 15 letters and
// digits. Checked loosely (14-16) so a typo is pointed out, never blocked.
export const normaliseLutArn = (arn) => String(arn || '').toUpperCase().replace(/[\s-]/g, '');
export const isLikelyLutArn = (arn) => /^[A-Z0-9]{14,16}$/.test(normaliseLutArn(arn));

// The last few financial years and the next one, for the Settings dropdown.
export const lutFyOptions = (today = new Date()) => {
  const cur = Number(fyOf(today).slice(0, 4)) || today.getFullYear();
  return [cur + 1, cur, cur - 1, cur - 2].map((y) => `${y}-${String((y + 1) % 100).padStart(2, '0')}`);
};

// Does the business's saved LUT cover this invoice date?
export const lutCoversDate = (profile, date) => !!normaliseLutArn(profile?.lutArn) && !!profile?.lutFy && profile.lutFy === fyOf(date);

// An export (client abroad, place of supply outside India) or a supply to an
// SEZ, by an Indian business: the same test computeInvoiceTotals uses.
export const isExportOrSez = ({ profile, client, details } = {}) => {
  if ((profile?.country || 'India') !== 'India') return false;
  if (client?.isSEZ) return true;
  const country = String(client?.country || '').trim();
  return !!country && country !== 'India' && !getStateCode(String(details?.placeOfSupply || '').trim());
};

// The line printed on the invoice, or '' when none applies. `totals` are the
// invoice's computed totals; lutZeroRated is set only when IGST was left out.
export const exportDeclaration = ({ profile, client, details, totals, options, showGST = true } = {}) => {
  if (!showGST || !isExportOrSez({ profile, client, details })) return '';
  if (!totals?.lutZeroRated) return IGST_PAID_DECLARATION;
  const arn = normaliseLutArn(options?.lutArn);
  return arn ? `${LUT_DECLARATION} - LUT ARN ${arn}${options?.lutFy ? ` (FY ${options.lutFy})` : ''}` : LUT_DECLARATION;
};
