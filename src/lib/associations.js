
export default function associations (models) {
  /*****************************
   * Final Associations
   *****************************/

  models.category.belongsTo(models.category, { as: 'Parent', foreignKey: 'parent' })
  models.category.hasMany(models.categoryField)
  models.category.hasMany(models.category, { as: 'Children', foreignKey: 'parent' })
  models.category.hasMany(models.listing)

  models.categoryCompetitor.belongsTo(models.category)
  models.categoryCompetitor.belongsTo(models.competitor)

  models.categoryField.belongsTo(models.field)
  models.categoryField.belongsTo(models.category)

  models.fieldCompetitor.belongsTo(models.field)
  models.fieldCompetitor.belongsTo(models.competitor)

  models.field.belongsTo(models.fieldCastType, { as: 'FieldCastType', foreignKey: 'fieldCastTypeId' })
  models.field.belongsTo(models.fieldCastType, { as: 'UIFieldCastType', foreignKey: 'uiFieldCastTypeId' })
  models.field.belongsTo(models.fieldGroup, { as: 'FieldGroup', foreignKey: 'fieldGroupId' })
  models.field.belongsTo(models.searchType, { as: 'UISearchType', foreignKey: 'uiSearchTypeId' })
  models.field.hasMany(models.fieldValueList, { as: 'FieldValues' })
  models.field.hasMany(models.fieldMinList, { as: 'FieldMinValues' })
  models.field.hasMany(models.fieldMaxList, { as: 'FieldMaxValues' })

  models.fieldMinList.belongsTo(models.field)
  models.fieldMaxList.belongsTo(models.field)

  models.field.belongsTo(models.fieldFormType, { as: 'UIAddFormType', foreignKey: 'uiAddFormTypeId' })
  models.field.belongsTo(models.fieldFormType, { as: 'UISearchFormType', foreignKey: 'uiSearchFormTypeId' })

  models.fieldGroup.belongsTo(models.fieldGroup, { as: 'Parent', foreignKey: 'parent' })
  models.fieldGroup.hasMany(models.fieldGroup, { as: 'Children', foreignKey: 'parent' })

  models.lead.belongsTo(models.leadStatus)
  models.lead.belongsTo(models.leadType)
  models.lead.belongsTo(models.person, { as: 'Buyer', foreignKey: 'buyerId' })

  models.listing.hasMany(models.listingBuyer)
  models.listing.belongsToMany(models.field, { as: 'Fields', through: 'listingField' })
  models.listing.hasMany(models.listingPhoto, { as: 'Photos', foreignKey: 'listingId' })
  models.listing.belongsTo(models.person, { as: 'Dealer', foreignKey: 'dealerId' })
  models.listing.belongsTo(models.company, { as: 'Company', foreignKey: 'companyId' })

  models.listing.belongsTo(models.category, { as: 'Category', foreignKey: 'categoryId' })

  models.model.belongsTo(models.manufacturer)

  models.person.belongsToMany(models.address, { through: 'personAddress' })
  models.address.belongsToMany(models.person, { through: 'personAddress' })

  models.company.belongsToMany(models.address, { through: 'companyAddress' })
  models.address.belongsToMany(models.company, { through: 'companyAddress' })

  models.company.belongsTo(models.person, { as: 'AccountManager', foreignKey: 'accountManagerId' })

  models.person.belongsTo(models.company)
}
