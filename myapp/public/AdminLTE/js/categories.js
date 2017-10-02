function editCategory(id){
	var name = $("#name_category_"+id).val();
	$("#id_category").val(id);
	$("#Category_Name").val(name);
}

function clearForm(){
	$("#Category_Name").val("");
	$("#id_category").val("");
}

function submitForm(){
	var id = $("#id_category").val();
	var name = $("#Category_Name").val();
	var urlString = "http://localhost:51336/api/Categorias/Edit/"
	if (id == ""){
		id = 0;
		urlString = "http://localhost:51336/api/Categorias/Create/"
	}
	$.ajax({
            type: "POST",
            url: urlString,
            data: {IdCategory: id, Name: name},
            success: function (res) {
                if (res == 1){
                    window.location.replace('Categorias');
                }else{
                	alert("Ocurrió un error al editar la categoria.")
                }
            },
            error: function (xhr) {
                alert("Oops");
            }
  });
}

function deleteCategory(id){
	if (confirm('Realmente desea eliminar la categoria ?')) {
		$.ajax({
	            type: "POST",
	            url: "http://localhost:51336/api/Categorias/Delete/",
	            data: {IdCategory: id, Name: ""},
	            success: function (res) {
	                if (res == 1){
	                    window.location.replace('Categorias');
	                }else{
	                	alert("Ocurrió un error al eliminar la categoria.")
	                }
	            },
	            error: function (xhr) {
	                alert("Oops");
	            }
	  });
	}
}

