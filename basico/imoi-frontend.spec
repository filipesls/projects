Name:           imoi-frontend
Version:        1.0
Release:        1%{?dist}
Summary:        MinhaOi integration files

Group:          Utilities
License:        GPL
URL:            http://imoi.oiinternet.com.br
Source0:        imoi-frontend-%{version}.tar.gz
BuildArch:      noarch
BuildRoot:      %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)


#BuildRequires: 
#Requires:      

%description
MinhaOi integration static files


%prep
%setup -q


%build


%install
rm -rf $RPM_BUILD_ROOT
install -d $RPM_BUILD_ROOT/opt/%{name}


%clean
rm -rf $RPM_BUILD_ROOT


%files
%dir /opt/%{name}
%defattr(-,root,root,-)

%post
chmod 755 -R /opt/%{name}

